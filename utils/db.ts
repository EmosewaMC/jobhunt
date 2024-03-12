import { Player, PlayerStats, PlayerMove} from "gameData/playerStats.ts";
//ref: https://docs.deno.com/deploy/kv/manual
export const deno_kv = await Deno.openKv();
export async function isNewPlayer(googleID: string) {
  const player = await deno_kv.get(["player",googleID]);
  //TODO: if player is new, 
  return player.value === null;
}

export async function getPlayer(googleID: string) {
  const player = await deno_kv.get(["player",googleID]);
  return player.value;
}

export async function setPlayer(googleID: string, player: Player) {
  const key = ["player", googleID];
  const res = await deno_kv.set(key, player);
  return res;
}

export async function setInterview(googleID: string, interview: PlayerStats) {
  const key = ["interview", googleID];
  const res = await deno_kv.set(key, interview);
  return res;

}

export async function getInterview(googleID: string): Promise<PlayerStats | null> {
  const interview = await deno_kv.get(["interview", googleID]);
  if (interview.value) {
    return interview.value as PlayerStats;
  } else {
    return null;
  }
}
export async function getPlayerMoves(googleID: string): Promise<PlayerMove[]>{
  const player = await deno_kv.get(["player",googleID]);
  const moves = (player.value as Player).moves;
  return moves;
}

