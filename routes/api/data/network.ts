import { Handlers } from "$fresh/server.ts";
import { deno_kv } from "$utils/db.ts"; // Assuming this is your custom module for database interactions
import { Player } from "gameData/playerStats.ts";
import { getUser } from "$utils/get_user.ts";

export const handler: Handlers = {
  async POST(request) {
    // console.log(request);
    const frmData = await request.formData();
    const connection_name = frmData.get("connection_name");
    console.log(connection_name);
    const player = await getUser(request) as Player;
    player.friendsList.push(connection_name?.toString() as string);
    await deno_kv.set(["player", player.googleId], player);
    return new Response("", { 
      status: 200, headers: {
        new_friends_list: JSON.stringify(player.friendsList)
        }
      });
  },
};
