import { Handlers } from "$fresh/server.ts";
import { deno_kv } from "$utils/db.ts"; // Assuming this is your custom module for database interactions
import {Player } from "gameData/playerStats.ts";


export const handler: Handlers = {
  async POST(request) {
    // Parse the request body as FormData
    const formData = await request.formData();
    
    try {
      const playerValue = formData.get("player") as FormDataEntryValue;
      if (playerValue === null) {
        throw new Error("Player data is missing", {});
      }
      //@ts-ignore: I cast to Player, so I know it's a Player object
      const playerObj = JSON.parse(playerValue) as Player;
      console.log("Writing Player Object to db:", playerObj);
      deno_kv.set(["player", playerObj.googleId], playerObj);
      return new Response(JSON.stringify({ message: "Move data stored successfully" }), {
        headers: { "Content-Type": "application/json" },
        status: 200, // OK
      });
    } catch (error) {
      console.error("Error writing move to deno_kv:", error);

      // Respond with an error message
      return new Response(JSON.stringify({ error: "Failed to store move data" }), {
        headers: { "Content-Type": "application/json" },
        status: 500, // Internal Server Error
      });
    }
  },
};
