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

export async function playerGainExperience(googleID: string, experience: number) {
  const player = await getPlayer(googleID) as Player;
  player.experience += experience;
  if(player.experience >= player.level * 10) {
    //they gain 10 points to spend on moves and level up
    player.unspentPoints += 10;
    player.level++;
  }
  return await setPlayer(googleID, player);
}

export async function getPlayerList() {
  const iter = await deno_kv.list({prefix: ["player"]});
  const playerList = [];
  for await (const player of iter) {
    playerList.push(player.value);
  }
  return playerList;
}
