import { Handlers } from "$fresh/server.ts";
import { deno_kv, getPlayer } from "$utils/db.ts"; // Assuming this is your custom module for database interactions
import { Player } from "gameData/playerStats.ts";
import { getUser } from "$utils/get_user.ts";

export const handler: Handlers = {
  async POST(request) {
    const frmData = await request.formData();
    const connection_name = frmData.get("connection_name");
	const addedConnection = await getPlayer(connection_name?.toString() as string) as Player;
    const player = await getUser(request) as Player;
	if (!player.friendsList.includes(addedConnection.googleId)) {
    	player.friendsList.push(addedConnection.googleId);
    	await deno_kv.set(["player", player.googleId], player);
      console.log("Added friend", addedConnection.googleName);
	} else {
    throw new Error("Player is already a friend");
  }

    return new Response("", { 
      status: 200, headers: {
        new_friends_list: JSON.stringify(player.friendsList)
        }
      });
  },
};
