import { createGoogleOAuthConfig } from "deno_kv_oauth";
import { noRunOnBuild, isDenoDeploy } from "./build.ts";

// This checks if we are running on Deno Deploy (in production)

const local_uri = Deno.env.get("LOCAL_REDIR_URI") as string;
const deploy_uri = Deno.env.get("PROD_REDIR_URI") as string;
// This is the OAuth configuration for Google Sign-In
export const oAuthConfig = noRunOnBuild(() =>
  createGoogleOAuthConfig({
    redirectUri: isDenoDeploy()
      ? deploy_uri
      : local_uri,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);
