import { useSignal } from "@preact/signals";

import { useState } from "preact/hooks";

//ref https://github.com/denoland/fresh_charts

import ResumeIsland from "../islands/resume/ResumeIsland.tsx";

export default function Home() {

  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Resume</h1>
        <title>Example Chart</title>
      <div class="p-4 mx-auto max-w-screen-md">
        <ResumeIsland player={{charisma: 0, motivation: 0, technicalSkills: 0, likability: 0}}/>
      </div>
        <p>
            This is where we will have the stats page. 
        </p>
      </div>
    </div>
  );
}
