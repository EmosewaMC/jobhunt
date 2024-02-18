import { Handlers } from "$fresh/server.ts";
import { signIn } from "deno_kv_oauth";
import { oAuthConfig } from "$utils/auth.ts";

// Handle the login request (redirect to google)
export const handler: Handlers = {
  async GET(request) {
    return await signIn(request, oAuthConfig);
  },
};