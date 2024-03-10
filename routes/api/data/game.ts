import { Handlers } from "$fresh/server.ts";
import { setInterview } from "$utils/db.ts"; // Assuming this is your custom module for database interactions
import { getUser } from "$utils/get_user.ts";
import { Player} from "gameData/playerStats.ts";


export const handler: Handlers = {
    async POST(request) {
        //@ts-ignore: I cast to Player, so I know it's a Player object
        const user = await getUser(request) as Player;
        const formData = await request.formData();
        const interviewerStats = formData.get('interviewerStats');

        if (interviewerStats) {
            const parsedInterviewerStats = JSON.parse(interviewerStats as string);
            const res = await setInterview(user.googleId, parsedInterviewerStats);
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
