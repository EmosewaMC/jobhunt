export const deno_kv = await Deno.openKv();

// const prefs = {
//   username: "ada",
//   theme: "dark",
//   language: "en-US",
// };

// const result = await kv.set(["preferences", "ada"], prefs);

// const entry = await kv.get(["preferences", "ada"]);
// console.log(entry.key);
// console.log(entry.value);
// console.log(entry.versionstamp);