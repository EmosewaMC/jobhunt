import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as Msg from "../shared/shared.ts";

let myX = 10;
let myY = 20;

Deno.serve((_req: Request) => {
  let response = undefined;

  const url = new URL(_req.url);
  if (url.searchParams.get("message") === undefined) {
    response = new Response(JSON.stringify("No message"), { status: 404 });
  } else if (url.searchParams.get("content") === undefined) {
    response = new Response(JSON.stringify("No content"), { status: 404 });
  } else {
    const content = JSON.parse(url.searchParams.get("content") || "{}");
    console.log(content);
    if (url.searchParams.get("message") === "GetPosition") {
      const position = new Msg.GetPosition(10, 20);
      position.deserialize(content);
      position.x = myX;
      position.y = myY;
      const stream = JSON.parse("{}");
      position.serialize(stream);
      response = new Response(JSON.stringify(stream), {
        status: 200,
      });
    } else if (url.searchParams.get("message") === "SetPosition") {
      const position = new Msg.SetPosition();
      position.deserialize(content);
      myX = position.x;
      myY = position.y;
      console.log("New position is:", myX, myY);
      response = new Response(JSON.stringify("Success"), { status: 200 });
    }
  }
  return response !== undefined
    ? response
    : new Response(JSON.stringify("Unknown Message"), { status: 404 });
});

const db = new DB("test.sqlite");
db.execute(`
CREATE TABLE IF NOT EXISTS people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  x FLOAT,
  y FLOAT,
  z FLOAT
)
  `);
