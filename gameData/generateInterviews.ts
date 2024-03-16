interface PlayerStats {
    charisma: number;
    motivation: number;
    technicalSkills: number;
    likability: number;
}

interface Interview {
    level: number;
    prompts: PlayerStats[];
}

export function generateInterview(level: number): PlayerStats[] {
    const obj = [];
    for (let j = 0; j < 5; j++) {
        // 5 prompts per level
        // the sum of the stats should be no more than 10 * level
        const stat: PlayerStats = { charisma: 0, motivation: 0, technicalSkills: 0, likability: 0 };

        let remaining = 10 * (level > 2 ? Math.round(level * 0.8) : level);
        const keys = Object.keys(stat) as Array<keyof PlayerStats>;

        // Shuffle the keys
        for (let i = keys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [keys[i], keys[j]] = [keys[j], keys[i]];
        }

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                stat[key] = remaining; // Assign remaining value to the last key
            } else {
                const random = Math.floor(Math.random() * (remaining + 1)); // +1 to include remaining in the possible range
                stat[key] = random;
                remaining -= random;
            }
        });

        obj.push(stat);
    }
    return obj;
}

const interviews: Interview[] = [];
for (let i = 1; i <= 2; i++) {
    const obj: Interview= { "level": i, "prompts": [] }
    for (let j = 0; j < 5; j++) {
        // 5 prompts per level
        // the sum of the stats should be no more than 10 * level
        const stat: PlayerStats = { charisma: 0, motivation: 0, technicalSkills: 0, likability: 0 };
        let remaining = 10 * i;

        Object.keys(stat).forEach((key, index, array) => {
            const statKey = key as keyof PlayerStats; // Type assertion here
            if (index === array.length - 1) {
                stat[statKey] = remaining; // Now TypeScript knows `statKey` is a valid key of PlayerStats
            } else {
                const random = Math.floor(Math.random() * (remaining + 1)); // +1 to include remaining in the possible range
                stat[statKey] = random;
                remaining -= random;
            }
        });
        

        obj.prompts.push(stat);
    }
    interviews.push(obj);
}
// Deno.writeFileSync("./gameData/interviewSettings.json", new TextEncoder().encode(JSON.stringify(interviews, null, 4)));
