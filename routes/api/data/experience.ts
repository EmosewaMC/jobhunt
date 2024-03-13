import { Handlers } from "$fresh/server.ts";
import { playerGainExperience } from "$utils/db.ts"; // Assuming this is your custom module for database interactions
import { getUser } from "$utils/get_user.ts";
import { Player } from "gameData/playerStats.ts";


export const handler: Handlers = {
    async POST(request) {
        const user = await getUser(request) as Player;
        const formData = await request.formData();
        const experienceGained = parseInt(formData.get('experienceGained') as string);
        console.log("experienceGained", experienceGained);
        if (experienceGained) {
            const res = await playerGainExperience(user.googleId, experienceGained);
            if (!res) {
                return new Response("", { status: 400 });
            }
        } else {
            // Handle the case where interviewerStats is not present in the FormData
            return new Response("", { status: 400 });
        }

        return new Response("", { status: 200 });
    },
};
