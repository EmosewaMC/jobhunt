import { createGoogleOAuthConfig } from "deno_kv_oauth";
import { noRunOnBuild } from "./build.ts";

// This checks if we are running on Deno Deploy (in production)
const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

// This is the OAuth configuration for Google Sign-In
export const oAuthConfig = noRunOnBuild(() =>
  createGoogleOAuthConfig({
    redirectUri: isDenoDeploy
      ? Deno.env.get("PROD_URL") + "/api/auth/callback"
      : "http://localhost:8000/api/auth/callback",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);
