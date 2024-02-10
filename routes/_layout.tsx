import { PageProps } from "$fresh/server.ts";
import Nav from "../islands/Nav.tsx";

export default function Layout({ Component }: PageProps) {
  // do something with state here
  return (
    <div class="flex">
      <Nav />
      <div class="flex-1">
        <Component />
      </div>
    </div>
  );
}
