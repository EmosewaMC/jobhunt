import GoogleIcon from "icons/brand-google-filled.tsx";
import { translate } from "gameData/locale.ts";
import type { Player } from "gameData/playerStats.ts";
import { playerGainExperience } from "$utils/db.ts";
export interface LoggedInCtx {
  req: Request;
  user: Player;
}

export default function Nav(ctx: LoggedInCtx) {
  return (
    <>
      <aside class="w-64 h-screen bg-gray-800 text-white flex flex-col">
        <div class="text-3xl text-center py-4 border-b border-gray-700">
          <a href="/" class="py-2 hover:bg-gray-700 rounded">
            {translate("LOGO", ctx.req)}
          </a>
        </div>
        <nav class="flex flex-col flex-1 px-4 py-8">
          <a href="/" class="py-2 hover:bg-gray-700 rounded">
            {translate("HOME", ctx.req)}
          </a>
          <a href="/worldMap" class="py-2 hover:bg-gray-700 rounded">
            {translate("MAP", ctx.req)}
          </a>
          <a
            href="/resume"
            class="py-2 hover:bg-gray-700 rounded flex items-center"
          >
            {translate("RESUME", ctx.req)}
            {ctx.user.unspentPoints
              ? (
                <img
                  class="ml-2 h-4 w-4" // Adjust the height and width of the image
                  src={"/notification.svg"}
                />
              )
              : null}
          </a>
          <a href="/network" class="py-2 hover:bg-gray-700 rounded">
            {translate("NETWORK", ctx.req)}
          </a>
          {/* <a href="/interview" class="py-2 hover:bg-gray-700 rounded">{translate("TEMP_INTERVIEW", ctx.req)}</a> */}
          <a
            href="/api/auth/logout"
            class="px-4 py-2 border rounded flex gap-4 hover:bg-gray-200 transition-all"
          >
            <GoogleIcon /> {translate("LOGOUT", ctx.req)}
          </a>
        </nav>
      </aside>
    </>
  );
}
