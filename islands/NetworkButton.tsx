import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "deno_kv_oauth";
import { oAuthConfig } from "$utils/auth.ts";
import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import type { Player } from "gameData/playerStats.ts";
import { initPlayer } from "gameData/playerStats.ts";
import { redirect } from "$utils/response.ts";
import { language_translate } from "gameData/locale.ts";

export interface NetworkProps {
	playerData: Array<string>;
}

export interface NetworkButtonProps {
	player: Player;
}

export function NetworkButton(player: NetworkButtonProps) {
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const form = document.getElementsByName("AddConnectionForm")[0] as HTMLFormElement;
    form.reset();

    try {
      const response = await fetch("/api/data/network", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Optionally, process the response data if needed
      // const responseData = await response.json();
      const friend_list = response.headers.get("new_friends_list");
      console.log("Server Response:", friend_list);
      
      // Here you might want to update the UI or state based on the response
      // For example, show a success message, reset form, or update local player data
    } catch (error) {
      console.error("Failed to make network request", error);
      // Here you could show an error message to the user or retry the request
    }
    window.location.href = "/network";
  };
  return (
	<form name="AddConnectionForm" onSubmit={handleSubmit}>
    	<div class="flex gap-8 py-6">
		    <Input placeholder={language_translate("PLAYER_NAME", player.player.lastLanguage)} name="connection_name"/>
    	  <Button onClick={() => console.log("Add")} type="submit">{language_translate("ADD_CONNECTION", player.player.lastLanguage)}</Button>
    	</div>
	</form>
  );
}

interface NetworkListProps {
  player: Player;
}

export function NetworkList({ player }: NetworkListProps) {
	return (
		<div class="flex gap-8 py-6">
			<ul>{player.friendsList.map(player => <li>{player}</li>)}</ul>
		</div>
	);
}
