import "$std/dotenv/load.ts";
const db = await Deno.openKv("https://api.deno.com/databases/a918e2d5-442a-4217-9ce8-a5f50ba9fe26/connect");

export async function getAllKeys() {
    const allKeys = []
    // the empty `prefix` below will return every key
    const entries = db.list({ prefix: [] })
    for await (const entry of entries) {
        allKeys.push(entry.key)
    }
    return allKeys
}

// add known keys to this set
const knownSet = new Set()

// validate the key as known (wanted)
const known = (key: Deno.KvKey) => knownSet.has(key);

/** delete all unknown rows from the db */
export async function clearUnknown() {
    const keys = await getAllKeys();
    keys.forEach((key) => {
        if (!known(key)) db.delete(key);
    })
}

//this runs by default, but it will clear the ENTIRE db
(() => {
    console.log('Clearing ALL db entries!');
    console.log(db.list({ prefix: [] }));
    clearUnknown();
})();

//this runs by default, but it will clear the ENTIRE db
(async () => {
    console.log('Clearing ALL local db entries!');
    const local = await Deno.openKv();
    const dbEntries = local.list({ prefix: [] })
    console.log(dbEntries);
    for await (const entry of dbEntries) {
        console.log(entry);
        local.delete(entry.key);
    }
    // clearUnknown();
})();