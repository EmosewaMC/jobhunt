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
