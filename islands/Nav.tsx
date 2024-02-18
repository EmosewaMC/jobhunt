import { useEffect } from "preact/hooks";
function googleLoginResponse(response: any) {
  console.log(response);
}
export default function Nav() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      (globalThis as any)["googleLoginResponse"] = (response: any) => {
        console.log(response);
      };
      window.onload = function () {
        globalThis.google.accounts.id.initialize({
          client_id: '152562187584-t91qmh2kpjmhlpnr092bkookbqopv80n',
          callback: googleLoginResponse
        });
        google.accounts.id.prompt();
      };
    };
  }, []);
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
        </nav>
        <div
          id="g_id_onload"
          data-client_id="152562187584-t91qmh2kpjmhlpnr092bkookbqopv80n"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="googleLoginResponse"
          data-auto_prompt="false"
        >
        </div>

        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin"
          data-size="medium"
          data-logo_alignment="left"
        >
        </div>
      </aside>
    </>
  );
}
