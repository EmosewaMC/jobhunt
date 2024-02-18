import { Handlers } from "$fresh/server.ts";
import { signOut } from "deno_kv_oauth";

// Handle the logout request
export const handler: Handlers = {
  async GET(request) {
    return await signOut(request);
  },
};
