import GoogleIcon from "icons/brand-google-filled.tsx";
import { FreshContext } from "$fresh/server.ts";
import { translate } from "gameData/locale.ts";

export interface NavCtx {
	  req: Request;
};

export default function Nav(ctx: NavCtx) {
  return (
    <>
      <aside class="w-64 h-full bg-gray-800 text-white flex flex-col">
        <div class="text-3xl text-center py-4 border-b border-gray-700">
          <a href="/" class="py-2 hover:bg-gray-700 rounded">{translate("LOGO", ctx.req)}</a>
        </div>
        <nav class="flex flex-col flex-1 px-4 py-8">
          <a href="/" class="py-2 hover:bg-gray-700 rounded">Home</a>
          <a href="/interview" class="py-2 hover:bg-gray-700 rounded">
            Temp Interview
          </a>
          <a
            href="/api/auth/login"
            class="px-4 py-2 border rounded flex gap-4 hover:bg-gray-200 transition-all"
          >
            <GoogleIcon /> Login
          </a>
        </nav>
      </aside>
    </>
  );
}
