import { useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import P5Canvas from "../islands/P5Canvas.tsx";
// export default P5Canvas;

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
function dispatchMove(moveNum: number) {
  globalThis.dispatchEvent(new CustomEvent("move" + moveNum));
}
export default function Home() {

  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Interview</h1>
        <P5Canvas />

      </div>
    </div>
  );
}
