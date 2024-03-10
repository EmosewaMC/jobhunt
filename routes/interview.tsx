import P5Canvas from "../islands/P5Canvas.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player } from "gameData/playerStats.ts";
import { Handlers } from "$fresh/server.ts";

import { translate } from "gameData/locale.ts";

export default async function Home(req: Request) {
  const user = await getUser(req) as Player;
  console.log(req);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">{translate("INTERVIEW", req)}</h1>
        <P5Canvas user={user} />

      </div>
    </div>
  );
}
