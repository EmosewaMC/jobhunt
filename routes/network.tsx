import { NetworkButton, NetworkProps, NetworkList} from "../islands/NetworkButton.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player } from "gameData/playerStats.ts";
import AsyncLayout from "../layouts/asyncLayout.tsx";
import { translate } from "gameData/locale.ts";
import { getPlayerList, getPlayer} from "../utils/db.ts";

// import Form from "../islands/Form.tsx";

// export default P5Canvas;

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
export default async function Home(req: Request) {
  const player = await getUser(req) as Player;
  const playerList = await getPlayerList() as Player[];
  const friends = [];
  const notFriends = [];
  if (!player) {
	return (
	  <div class="px-4 py-8 mx-auto bg-[#86efac]">
		<div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
		  <h1 class="text-4xl font-bold">{translate("WELCOME_TO_THE_JOBHUNT", req)}</h1>
		  <a class="my-4 text-blue-500 underline" href="/api/auth/login">
		  	{translate("SIGN_IN_TO_GET_STARTED", req)}
		  </a>
		</div>
	  </div>
	);
  }

  for(const p of playerList){
    if(player.friendsList.includes(p.googleId)){
      friends.push(((await getPlayer(p.googleId) as Player).googleName) + " ID:" + p.googleId);
    } else {
      if(p.googleId !== player.googleId) {
        notFriends.push(((await getPlayer(p.googleId) as Player).googleName) + " ID:" + p.googleId);
      }
    } 
  }
  console.log("Friends:", notFriends);
// list all players that arent friends		

const notFriendsList = (
	<ul>
	{notFriends.map((p) => <li>{p}</li>)}
	</ul>
  );
const friendsList = (
	  <ul>
	  {friends.map((p) => <li>{p}</li>)}
	  </ul>
	);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold">{translate("UNCONNECTED_PLAYERS", req)}</h1>
		{notFriendsList}
		<h1 class="text-2xl font-bold">{translate("MY_NETWORK", req)}</h1>
		{friendsList}
        <AsyncLayout player={player}>
          {({ player }) => (
			  <div class="items-center justify-center">
		          <NetworkList player={player}/>
		          <NetworkButton player={player}/>
            </div>
          )}
        </AsyncLayout>
      </div>
    </div>
  );
}
