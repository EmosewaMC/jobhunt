import AsyncLayout from "../layouts/asyncLayout.tsx";
import CreateMoveForm from "../islands/CreateMoveForm.tsx";
import { getSessionId } from "deno_kv_oauth";
import { deno_kv } from "$utils/db.ts";
import type { Player } from "gameData/playerStats.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { redirect } from "$utils/response.ts";

export const handler: Handlers<Player | null> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req);

    if (!sessionId) {
      if(!sessionId) return redirect("/api/auth/login");
    }

    const userHasSession = await deno_kv.get(["activeSessions", sessionId]);
    if (!userHasSession) {
      return ctx.render(null);
    }

    const kvUser = await deno_kv.get([
      "player",
      userHasSession.value as string,
    ]);
    const player = kvUser.value as Player;

    return ctx.render(player);
  },
};

export default function ResumePage({ data }: PageProps<Player | null>) {
  if (!data) {
    // Handle the case where no data is returned (e.g., redirect or show a message)
    return <div>No player data found.</div>;
  }

  // Use the data fetched in the handler
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Interview</h1>
        <AsyncLayout player={data}>
          {({ player }) => (
            <div>
              <CreateMoveForm player={player} />
              {/* Additional components */}
            </div>
          )}
        </AsyncLayout>
      </div>
    </div>
  );
}
