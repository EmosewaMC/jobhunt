import { Button } from "../components/Button.tsx";
import { Player, PlayerMove, PlayerStats } from "gameData/playerStats.ts";
import { Signal, useSignal } from "@preact/signals";
import { Fragment } from "preact";

interface MoveFormProps {
    move: PlayerMove | null;  // null indicates a new move form
    onPointsChange: (delta: number) => void;  // Function to handle point allocation changes
    unallocatedPoints: number;
  }

function MoveForm({ move, onPointsChange, unallocatedPoints }: MoveFormProps) {
    const statsSignals = Object.entries(move ? move.pointsAllocated : { charisma: 0, motivation: 0, technicalSkills: 0, likability: 0 })
    .reduce((acc, [key, value]) => {
      acc[key] = useSignal(value);
      return acc;
    }, {} as Record<string, Signal<number>>);

  const handleIncrement = (signal: Signal<number>) => {
    if (signal.value >= 0) {
      signal.value++;
      onPointsChange(-1);  // Subtracting from unallocated points
    }
  };

  const handleDecrement = (signal: Signal<number>) => {
    if (signal.value > 0) {  // Ensuring stat value doesn't go below 0
      signal.value--;
      onPointsChange(1);  // Adding back to unallocated points
    }
  };

  const counters = Object.entries(statsSignals).map(([key, signal]) => (
    <Fragment key={key}>
      <div class="flex gap-8 py-6">
        <h2>{key}</h2>
        <Button type="button" onClick={() => handleDecrement(signal)}>-1</Button>
        <p class="text-3xl tabular-nums">{signal.value}</p>
        <Button type="button" onClick={() => handleIncrement(signal)}>+1</Button>
      </div>
    </Fragment>
  ));

  return (
    <form>
      <input
        class="text-2xl font-bold text-center"
        placeholder={move ? move.move : "New Move"}
      >
        {move ? move.move : "New Move"}
      </input>
      {counters}
      {/* Include a submit button or other elements as needed */}
    </form>
  );
}

interface CreateMoveFormsProps {
  player: Player;
}

export default function CreateMoveForms({ player }: CreateMoveFormsProps) {
    const unallocatedPoints = useSignal(player.unspentPoints);
  
    const handlePointsChange = (delta: number) => {
      const newPoints = unallocatedPoints.value + delta;
      unallocatedPoints.value = Math.max(newPoints, 0);  // Ensure unallocatedPoints don't go negative
    };
  
    return (
      <Fragment>
        <p>Unallocated Points: {unallocatedPoints.value}</p>
        {/* Render MoveForms, passing unallocatedPoints and handlePointsChange */}
      </Fragment>
    );
  }
  