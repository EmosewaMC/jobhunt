import { NetworkList } from "../islands/NetworkButton.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player } from "gameData/playerStats.ts";
import { translate } from "gameData/locale.ts";
import { getPlayerList } from "../utils/db.ts";
import { MockInterview } from "../islands/MockInterview.tsx";
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
          <h1 class="text-4xl font-bold">
            {translate("WELCOME_TO_THE_JOBHUNT", req)}
          </h1>
          <a class="my-4 text-blue-500 underline" href="/api/auth/login">
            {translate("SIGN_IN_TO_GET_STARTED", req)}
          </a>
        </div>
      </div>
    );
  }

  for (const p of playerList) {
    if (player.friendsList.includes(p.googleId)) {
      friends.push(p);
    } else {
      if (p.googleId !== player.googleId) {
        notFriends.push(p);
      }
    }
  }
  // list all players that arent friends

  const notFriendsList = (
    <ul>
      {notFriends.map((p) => (
        <NetworkList playerRequested={p} playerRequesting={player} />
      ))}
    </ul>
  );
  const friendsList = (
    <ul>
      {friends.map((p) => (
        <MockInterview playerRequested={p} playerRequesting={player} />
      ))}
    </ul>
  );
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {notFriends.length
          ? (
            <>
              <h1 class="text-2xl font-bold">
                {translate("UNCONNECTED_PLAYERS", req)}
              </h1>
              {notFriendsList}
            </>
          )
          : null}
        {friends.length
          ? (
            <>
              <h1 class="text-2xl font-bold">
                {translate("MY_NETWORK", req)}
              </h1>
              {friendsList}
            </>
          )
          : null}
      </div>
    </div>
  );
}
