import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "deno_kv_oauth";
import { oAuthConfig } from "$utils/auth.ts";
import { deno_kv, isNewPlayer} from "$utils/db.ts";
import { initPlayer} from "gameData/playerStats.ts";
/** Properties guarenteed to exist on a google user */
interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}


/** Get the google user JSON */
async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const googleUserReq = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    },
  );
  return await googleUserReq.json();
}

// Handle the callback (redirect to dashboard)
export const handler: Handlers = {
  async GET(request) {
    const { response,sessionId, tokens } = await handleCallback(
      request,
      oAuthConfig,
    );
	console.log(tokens);
	console.log(sessionId);
    const googleUser = await getGoogleUser(tokens.accessToken);
    if(await isNewPlayer(googleUser.id)){
      deno_kv.set(["player", googleUser.id], initPlayer(googleUser.id, googleUser.name));
    } 
    deno_kv.set(["activeSessions",sessionId], googleUser.id);
    

    return response;
  },
};
