import { useSignal } from "@preact/signals";

//ref https://github.com/denoland/fresh_charts
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";


export default function Home() {

  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Resume</h1>
        <title>Example Chart</title>
      <div class="p-4 mx-auto max-w-screen-md">
      <Chart
          type="line"
          options={{
            devicePixelRatio: 1,
            scales: { y: { beginAtZero: true } },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [
              {
                label: "Sessions",
                data: [123, 234, 234],
                borderColor: ChartColors.Red,
                backgroundColor: transparentize(ChartColors.Red, 0.5),
                borderWidth: 1,
              },
              {
                label: "Users",
                data: [346, 233, 123],
                borderColor: ChartColors.Blue,
                backgroundColor: transparentize(ChartColors.Blue, 0.5),
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
        <p>
            This is where we will have the stats page. 
        </p>
      </div>
    </div>
  );
}
