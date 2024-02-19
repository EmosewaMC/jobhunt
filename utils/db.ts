//ref: https://docs.deno.com/deploy/kv/manual
export const deno_kv = await Deno.openKv();
export async function isNewPlayer(googleID: string) {
  const player = await deno_kv.get(["player",googleID]);
  //TODO: if player is new, 
  return player.value === null;

}

export async function fetchPlayer(googleID: string) {
  const player = await deno_kv.get(["player",googleID]);
  return player.value;
}
