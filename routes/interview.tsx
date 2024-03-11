import P5Canvas from "../islands/P5Canvas.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player, PlayerMove, PlayerStats} from "gameData/playerStats.ts";
import { getInterview, getPlayerMoves } from "../utils/db.ts";
import { translate, get_language_from_request } from "gameData/locale.ts";

export default async function Home(req: Request) {
  const user = await getUser(req) as Player;
  if (!user) {
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

  const interviewData = await getInterview(user.googleId) as PlayerStats;
  const playerMoves = await getPlayerMoves(user.googleId) as PlayerMove[];
  
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">{translate("INTERVIEW", req)}</h1>
        <P5Canvas user={user} interviewData={interviewData} playerMoves={playerMoves} language={get_language_from_request(req)} />

      </div>
    </div>
  );
}
