import { Handlers } from "$fresh/server.ts";
import { deno_kv } from "$utils/db.ts"; // Assuming this is your custom module for database interactions
import {getUser} from "$utils/get_user.ts";
import { Player } from "gameData/playerStats.ts";


export const handler: Handlers = {
    
    async POST(request) {
        //@ts-ignore: I cast to Player, so I know it's a Player object
        const user = await getUser(request) as Player;
        const formData = await request.formData();
        const stats = formData.get("interviewerStats");
        //we could store the stats in the db here
        console.log('stats ', stats);
        // Parse the request body as FormData
        return new Response(JSON.stringify({ message: "Move data stored successfully" }), {
            headers: {
                location: "/interview",
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
            status: 302
        });
    },
};

// try {
//   const playerValue = formData.get("player") as FormDataEntryValue;
//   if (playerValue === null) {
//     throw new Error("Player data is missing", {});
//   }
//   //@ts-ignore: I cast to Player, so I know it's a Player object
//   const playerObj = JSON.parse(playerValue) as Player;
//   if (!request.headers.get("accept-language") || request.headers.get("accept-language")?.length === 0) playerObj.lastLanguage = "en";
//   else playerObj.lastLanguage = request.headers.get("accept-language")?.substring(0, 2) || "en";
//   console.log("Writing Player Object to db:", playerObj);
//   deno_kv.set(["player", playerObj.googleId], playerObj);
//   return new Response(JSON.stringify({ message: "Move data stored successfully" }), {
//     headers: {
//       location: "/resume",
//     },
//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
//     status: 302
//   });
// } catch (error) {
//   console.error("Error writing move to deno_kv:", error);

//   // Respond with an error message
//   return new Response(JSON.stringify({ error: "Failed to store move data" }), {
//     headers: { "Content-Type": "application/json" },
//     status: 500, // Internal Server Error
//   });
// }