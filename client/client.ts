import { Database } from "https://deno.land/x/sqlite3@0.10.0/mod.ts";
import * as Msg from "../shared/shared.ts";

function handleMessage(message: any) {
  if (message["message"] !== undefined) {
    console.log("Received reponse for:", message["message"]);
    if (message["message"] === "GetPosition") {
      const msgGetPosition = new Msg.GetPosition();
      msgGetPosition.deserialize(message);
      // Run a simple query
      const database = new Database("../server/test.sqlite");

      database.run("INSERT INTO people (name,x,y,z) VALUES (?,?,?,?)", [
        "David Markowitz",
        msgGetPosition.x,
        msgGetPosition.y,
      ]);

      // Print out data in table
      const stmt = database.prepare("SELECT name, x, y, z FROM people");
      for (const [name, x, y, z] of stmt.values()) {
        console.log(name, x, y, z);
      }
    }
  }
}

async function sendMessage(message: Msg.Message) {
  const url = new URL("http://localhost:8000/");
  url.searchParams.set("message", message.messageName);
  const stream = JSON.parse("{}");
  message.serialize(stream);
  url.searchParams.set("content", JSON.stringify(stream));
  const response = await fetch(new Request(url.toString()));
  handleMessage(JSON.parse(await response.text()));
}

console.log("Sending Position...");
await sendMessage(
  new Msg.SetPosition(Math.random() * 100, Math.random() * 1000),
);
console.log("Getting Position...");
await sendMessage(new Msg.GetPosition());
