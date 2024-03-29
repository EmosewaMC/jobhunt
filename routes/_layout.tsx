import Nav from "../islands/Nav.tsx";
import NavLoggedIn from "../islands/NavLoggedIn.tsx"; 
import { Head } from "https://deno.land/x/fresh@1.6.3/runtime.ts";
import { getUser } from "$utils/get_user.ts";
import { FreshContext } from "$fresh/server.ts";
import type { Player } from "gameData/playerStats.ts";


export default async function Layout(req: Request, ctx: FreshContext) {
  const user = await getUser(req) as Player;
  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade">
        </meta>
      </Head>
      <div class="flex">
        {user ? <NavLoggedIn req={req} user={user}  /> : <Nav req={req}/>}
        <div class="flex-1">
          <ctx.Component />
        </div>
      </div>
    </>
  );
}
