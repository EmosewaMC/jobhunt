import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "deno_kv_oauth";
import { oAuthConfig } from "$utils/auth.ts";
import { isNewPlayer} from "$utils/db.ts";

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
    const { response, sessionId, tokens } = await handleCallback(
      request,
      oAuthConfig,
    );
    const googleUser = await getGoogleUser(tokens.accessToken);
    if(await isNewPlayer(googleUser.id)){
      // init them with basic stats
      console.log("New player")
    } else {
      console.log("Returning player")
    }
    
    // // Upsert user
    // const { data: userData, error: userError } = await supabase.from("users")
    //   .upsert({
    //     name: googleUser.name,
    //     email: googleUser.email,
    //     picture: googleUser.picture,
    //   }, { onConflict: "email" }).select();
    // if (userError || !userData || userData.length === 0) {
    //   return new Response("error creating user record");
    // }
    // const userId = userData[0].id;

    // // upsert session
    // const { error: sessionError } = await supabase.from("sessions").upsert({
    //   id: sessionId,
    //   user_id: userId,
    // }).select();
    // if (sessionError) {
    //   return new Response("error creating session record");
    // }

    return response;
  },
};
