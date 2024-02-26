import { NetworkButton, NetworkProps, NetworkList} from "../islands/NetworkButton.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player } from "gameData/playerStats.ts";

// import Form from "../islands/Form.tsx";

// export default P5Canvas;

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
export default async function Home(req: Request) {
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
        <h1 class="text-4xl font-bold">My Network</h1>
		<NetworkList playerData={["player1", "player2"]}/>
        <p>
            This is where we will have the network/friend invite view.
        </p>
		<NetworkButton/>
      </div>
    </div>
  );
}

