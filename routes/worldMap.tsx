import { useSignal } from "@preact/signals";
import Map from "../islands/MapIsland.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player } from "gameData/playerStats.ts";

export default async function Home(req : Request) {
    //need to make the world map interactable
  const user = await getUser(req) as Player;
  if (!user) {
	return (
	  <div class="px-4 py-8 mx-auto bg-[#86efac]">
		<div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
		  <h1 class="text-4xl font-bold">Welcome to the Jobhunt</h1>
		  <a class="my-4 text-blue-500 underline" href="/api/auth/login">
			Sign in to get started
		  </a>
		</div>
	  </div>
	);
  }
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">World Map</h1>
        <Map />
      </div>
    </div>
  );
}
