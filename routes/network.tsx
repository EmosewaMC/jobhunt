import { useSignal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import { NetworkButton, NetworkProps, NetworkList} from "../islands/NetworkButton.tsx";

import { Handlers } from "$fresh/server.ts";

// import Form from "../islands/Form.tsx";

// export default P5Canvas;

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">My Network</h1>
		<NetworkList playerData={["player1", "player2"]}/>
        <p>
            This is where we will have the network/friend invite view.
        </p>
		<NetworkButton/>
      </div>
    </div>
  );
}

