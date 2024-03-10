import { getSessionId } from "deno_kv_oauth";
import { deno_kv } from "$utils/db.ts";
import type { Player } from "gameData/playerStats.ts";
import { get_language_from_request } from "gameData/locale.ts";

/** Given a response object, return either a user or null */
export async function getUser(request: Request): Promise<Player | null | unknown>{
  const sessionId = await getSessionId(request);
  if (!sessionId) return null;
  const userSessionData = await deno_kv.get(["activeSessions", sessionId]);
  if (!userSessionData) return null;
  const toReturn = await deno_kv.get(["player", userSessionData.value as string]);
  const player = toReturn.value as Player;
  player.lastLanguage = get_language_from_request(request);
  // save player to update lastLanguage
  await deno_kv.set(["player", player.googleId], player);
  return player;
}
