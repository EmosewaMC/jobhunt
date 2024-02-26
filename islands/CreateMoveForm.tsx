import { Button } from "../components/Button.tsx";
import { Player, PlayerMove, PlayerStats } from "gameData/playerStats.ts";
import { Signal, useSignal } from "@preact/signals";
import { Fragment } from "preact";
import { useState } from "preact/hooks";

interface MoveFormProps {
  move: PlayerMove | null; // null indicates a new move form
  onPointsChange: (delta: number) => void; // Function to handle point allocation changes
  unallocatedPoints: number;
}

function MoveForm({ move, onPointsChange, unallocatedPoints }: MoveFormProps) {
  const statsSignals = Object.entries(
    move
      ? move.pointsAllocated
      : { charisma: 0, motivation: 0, technicalSkills: 0, likability: 0 },
  ).reduce((acc, [key, value]) => {
    acc[key] = useSignal(value);
    return acc;
  }, {} as Record<string, Signal<number>>);

  const handleIncrement = (signal: Signal<number>, statName: string) => {
    if (signal.value >= 0 && unallocatedPoints > 0) {
      signal.value++;
      onPointsChange(-1);
    }
  };

  const handleDecrement = (signal: Signal<number>, statName: string) => {
    if (signal.value > 0) {
      signal.value--;
      onPointsChange(1);
    }
  };

  const counters = Object.entries(statsSignals).map(([key, signal]) => (
    <Fragment key={key}>
      <div class="flex gap-8 py-6 items-center">
        <label class="font-bold" for={`${move?.move}-${key}`}>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
        <Button
          type="button"
          onClick={() =>
            handleDecrement(signal, key)}
          aria-label={`Decrease ${key}`}
        >
          -1
        </Button>
        <p class="text-3xl tabular-nums" id={`${move?.move}-${key}`}>
          {signal.value}
        </p>
        <input
          type="hidden"
          name={`${move?.move}-${key}`}
          value={signal.value}
        />
        <Button
          type="button"
          onClick={() => handleIncrement(signal, key)}
          aria-label={`Increase ${key}`}
        >
          +1
        </Button>
      </div>
    </Fragment>
  ));
  return (
    <form>
      <div class="text-2xl font-bold text-center">
        <label for="move-name">Move Name</label>
        <input
          id="move-name"
          class="text-center"
          placeholder={move ? move.move : "New Move"}
          value={move ? move.move : ""}
        />
      </div>
      {counters}
    </form>
  );
}

interface CreateMoveFormsProps {
  player: Player;
}

interface MoveFormData {
  move: string;
  pointsAllocated: {
    charisma: number;
    motivation: number;
    technicalSkills: number;
    likability: number;
  };
}
export default function CreateMoveForms({ player }: CreateMoveFormsProps) {
  // Calculate the number of additional new move forms to display
  const unallocatedPoints = useSignal(player.unspentPoints);
  const [moveFormsData, setMoveFormsData] = useState<MoveFormData[]>(
    player.moves.map((move) => ({
      move: move.move,
      pointsAllocated: move.pointsAllocated,
    })),
  );
  const handlePointsChange = (delta: number) => {
    const newPoints = unallocatedPoints.value + delta;
    unallocatedPoints.value = newPoints >= 0 ? newPoints : 0; // Prevent negative unallocated points
  };

  // Limit the number of additional forms to 4
  const additionalForms = Math.min(
    Math.max(1, player.level - player.moves.length),
    4 - player.moves.length,
  );
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement); // Cast the event target to a form element

    try {
      // Replace 'your-api-endpoint' with the actual endpoint URL
      const response = await fetch('/api/data/player', {
        method: 'POST',
        body: formData, // FormData object can be directly used with fetch
        // If your API expects JSON, you might need to convert formData to JSON
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle response data as needed
      const result = await response.json();
      console.log("Response from the server:", result);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <p>Unallocated Points: {unallocatedPoints.value}</p>
        {player.moves.map((move, index) => (
          <MoveForm
            key={index}
            move={move}
            onPointsChange={handlePointsChange}
            unallocatedPoints={unallocatedPoints.value}
          />
        ))}
        {Array.from(
          { length: additionalForms },
          (_, index) => (
            <MoveForm
              key={`new-${index}`}
              move={null}
              onPointsChange={handlePointsChange}
              unallocatedPoints={unallocatedPoints.value}
            />
          ),
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Fragment>
  );
}
