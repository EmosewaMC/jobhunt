import { getSessionId } from "deno_kv_oauth";
import { deno_kv } from "$utils/db.ts";
import type { Player } from "gameData/playerStats.ts";

/** Given a response object, return either a user or null */
export async function getUser(request: Request): Promise<Player | null | unknown>{
  const sessionId = await getSessionId(request);
  if (!sessionId) return null;
  const userSessionData = await deno_kv.get(["activeSessions", sessionId]);
  console.log(userSessionData);
  if (!userSessionData) return null;
  const toReturn = await deno_kv.get(["player", userSessionData.value as string]);
  console.log(toReturn);
  return toReturn.value as Player;
}
