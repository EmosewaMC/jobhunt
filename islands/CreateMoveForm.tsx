import { Button } from "../components/Button.tsx";
import { Player, PlayerStats } from "gameData/playerStats.ts";
import { Signal, useSignal } from "@preact/signals";
import { Fragment } from 'preact';

interface FormProps {
  player: Player;
}

export default function CreateMoveForm({ player }: FormProps) {
  // Create a signal for each stat in the PlayerStats
  const statsSignals = Object.entries(player.stats).reduce((acc, [key, value]) => {
    acc[key] = useSignal(value);
    return acc;
  }, {} as Record<string, Signal<number>>);

  const counters = Object.entries(statsSignals).map(([key, signal]) => (
    <Fragment key={key}>
      <div class="flex gap-8 py-6">
        <h2>{key}</h2>
        <Button type="button" onClick={() => signal.value--}>-1</Button>
        <p class="text-3xl tabular-nums">{signal.value}</p>
        <Button type="button" onClick={() => signal.value++}>+1</Button>
      </div>
    </Fragment>
  ));

  return (
    <Fragment>
      <form>
        <input type="text" name="moveName" placeholder="Move Name" />
        {counters}
      </form>
    </Fragment>
  );
}
