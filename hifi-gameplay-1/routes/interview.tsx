import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { useEffect, useRef } from 'preact/hooks';
import { Button } from "../components/Button.tsx";

// export default P5Canvas;

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
export default function Home() {

  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Interview</h1>
        <canvas id="p5Canvas" class="w-full h-full"></canvas>
        <div>
            <Button class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded " onClick={() => console.log(" move 1")}>move 1</Button>
            <Button class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded " onClick={() => console.log(" move 2")}>move 2</Button>
            <Button class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded " onClick={() => console.log(" move 3")}>move 3</Button>
            <Button class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded " onClick={() => console.log(" move 4")}>move 4</Button>
        </div>
      </div>
    </div>
  );
}
