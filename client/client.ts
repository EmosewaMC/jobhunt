import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as Msg from "../shared/shared.ts";

function handleMessage(message: any) {
  if (message["message"] !== undefined) {
    const msgGetPosition = new Msg.GetPosition();
    msgGetPosition.deserialize(message);
    // Run a simple query
    const db = new DB("../server/test.db");

    db.query("INSERT INTO people (name,x,y,z) VALUES (?,?,?,?)", [
      "David Markowitz",
      msgGetPosition.x,
      msgGetPosition.y,
    ]);

    // Print out data in table
    for (
      const [name, x, y, z] of db.query("SELECT name, x, y, z FROM people")
    ) {
      console.log(name, x, y, z);
    }
  }
}

async function sendMessage(message: Msg.Message) {
  const url = new URL("http://localhost:8000/");
  url.searchParams.set("message", message.messageName);
  const stream = JSON.parse("{}");
  message.serialize(stream);
  url.searchParams.set("content", JSON.stringify(stream));
  console.log(url.toString());
  const response = await fetch(new Request(url.toString()));
  console.log(response);
  handleMessage(JSON.parse(await response.text()));
}

sendMessage(new Msg.SetPosition(Math.random() * 100, Math.random() * 1000));
sendMessage(new Msg.GetPosition());
