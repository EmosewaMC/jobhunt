import GoogleIcon from "icons/brand-google-filled.tsx";
export default function Nav() {
  return (
    <>
      <aside class="w-64 h-full bg-gray-800 text-white flex flex-col">
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
          <a
            href="/api/auth/logout"
            class="px-4 py-2 border rounded flex gap-4 hover:bg-gray-200 transition-all"
          >
            <GoogleIcon /> Logout
          </a>
        </nav>
      </aside>
    </>
  );
}
