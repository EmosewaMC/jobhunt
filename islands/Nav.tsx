import { Button } from "../components/Button.tsx";

export default function Nav() {
  const thing = <div>hi</div>;
  return (
    <aside class="w-64 h-full bg-gray-800 text-white flex flex-col">
      <meta name="google-signin-client_id" content="152562187584-t91qmh2kpjmhlpnr092bkookbqopv80n.apps.googleusercontent.com"></meta>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <div class="text-3xl text-center py-4 border-b border-gray-700">
        <a href="/" class="py-2 hover:bg-gray-700 rounded">Logo</a>
      </div>
      <nav class="flex flex-col flex-1 px-4 py-8">
        <a href="/" class="py-2 hover:bg-gray-700 rounded">Home</a>
        <a href="/worldMap" class="py-2 hover:bg-gray-700 rounded">Map</a>
        <a href="/resume" class="py-2 hover:bg-gray-700 rounded">Resume</a>
        <a href="/network" class="py-2 hover:bg-gray-700 rounded">Network</a>
        <a href="/interview" class="py-2 hover:bg-gray-700 rounded">
          Temp Interview
        </a>
      </nav>
      <div class="px-4 py-4 border-t border-gray-700 text-black">
        <div class="g-signin2 w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded" data-onsuccess="onSignIn">
          sign in
        </div>
      </div>
    </aside>
  );
}
