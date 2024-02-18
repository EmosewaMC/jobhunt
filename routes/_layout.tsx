import { PageProps } from "$fresh/server.ts";
import Nav from "../islands/Nav.tsx";
import { Head } from "https://deno.land/x/fresh@1.6.3/runtime.ts";


export default function Layout({ Component }: PageProps) {
  // do something with state here
  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade">
        </meta>
      </Head>
      <div class="flex">
        <Nav />
        <div class="flex-1">
          <Component />
        </div>
      </div>
    </>
  );
}
