import { Button } from "../components/Button.tsx";

export default function Nav() {
  return (
    <aside class="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div class="text-3xl text-center py-4 border-b border-gray-700"><a href="/" class="py-2 hover:bg-gray-700 rounded">Logo</a></div>
      <nav class="flex flex-col flex-1 px-4 py-8">
        <a href="/" class="py-2 hover:bg-gray-700 rounded">Home</a>
        <a href="/worldMap" class="py-2 hover:bg-gray-700 rounded">Map</a>
        <a href="/resume" class="py-2 hover:bg-gray-700 rounded">Resume</a>
        <a href="/network" class="py-2 hover:bg-gray-700 rounded">Network</a>
        <a href="/interview" class="py-2 hover:bg-gray-700 rounded">Temp Interview</a>
      </nav>
      <div class="px-4 py-4 border-t border-gray-700 text-black">
        <Button class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded " onClick={() => console.log(" tried to sign in")}>sign in</Button>
      </div>
    </aside>
  );
}
