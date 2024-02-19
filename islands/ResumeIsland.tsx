import {PlayerStats} from "../gameData/playerStats.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
//ref https://github.com/denoland/fresh_charts

interface ResumeIslandProps {
    player: PlayerStats;
}
export default function ResumeIsland(player: ResumeIslandProps) {

    return(
    <Chart
        type="bar"
        options={{
            scales: { y: { beginAtZero: true }},
        }}
        data={{
            labels: ["Charisma", "Motivation", "Technical Skills", "Likability"],
            datasets: [{
                label: "Allocated Points",
                data: [Object.values(player)],
                borderColor: ChartColors.Red,
                backgroundColor: transparentize(ChartColors.Red, 0.5),
                borderWidth: 1,
            }]
        }}
    />
    );
}