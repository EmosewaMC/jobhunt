import { useSignal } from "@preact/signals";
import Map from "../islands/MapIsland.tsx";

export default function Home() {
    //need to make the world map interactable

  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">World Map</h1>
        <Map />
      </div>
    </div>
  );
}