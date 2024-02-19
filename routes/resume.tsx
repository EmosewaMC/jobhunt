import { useSignal } from "@preact/signals";
import type { FreshContext } from "$fresh/server.ts";
import { deno_kv, isNewPlayer} from "$utils/db.ts";
import { getUser} from "$utils/get_user.ts"; 
import { redirect} from "$utils/response.ts";
import { getSessionId } from "deno_kv_oauth";
import {Player} from "gameData/playerStats.ts";
//ref https://github.com/denoland/fresh_charts

import ResumeIsland from "../islands/ResumeIsland.tsx";

export default async function Home(req: Request, ctx: FreshContext) {
  const sessionId = await getSessionId(req);
  console.log("sessionid: ", sessionId);
  if(!sessionId) return redirect("/api/auth/login");
  const userHasSession = await deno_kv.get(["activeSessions",sessionId!]);
  console.log("userHasSession: ", userHasSession);
  const kvUser = await deno_kv.get(["player",userHasSession.value as string]);
  const player = kvUser.value as Player;
  console.log("player: ", player);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Resume</h1>
        <title>Example Chart</title>
      <div class="p-4 mx-auto max-w-screen-md">
        <ResumeIsland player={{charisma: 0, motivation: 0, technicalSkills: 0, likability: 0}}/>
      </div>
        <p>
            Your data from the database: <br/>
            {JSON.stringify(player)}
        </p>
      </div>
    </div>
  );
}
