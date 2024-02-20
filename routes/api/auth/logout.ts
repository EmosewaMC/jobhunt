import { Handlers } from "$fresh/server.ts";
import { signOut } from "deno_kv_oauth";
import { deno_kv } from "$utils/db.ts";
import { getSessionId } from "deno_kv_oauth";

// Handle the logout request
export const handler: Handlers = {
  async GET(request) {
    //remove them from the active sessions
    const sessionId = await getSessionId(request);
    if (!sessionId) return new Response("No session found", { status: 400 });
    await deno_kv.delete(["activeSessions", sessionId]);
    

    return await signOut(request);
  },
};
