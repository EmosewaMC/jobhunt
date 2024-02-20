import { getSessionId } from "deno_kv_oauth";

/** Given a response object, return either a user or null */
export async function getUser(request: Request) {
  const sessionId = await getSessionId(request);
  if (!sessionId) return null;
  return sessionId;

}
