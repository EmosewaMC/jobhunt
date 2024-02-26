import { Button } from "../components/Button.tsx";
import { Player, PlayerMove, PlayerStats } from "gameData/playerStats.ts";
import { Signal, useSignal } from "@preact/signals";
import { Fragment } from "preact";

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
  const moveSignal = useSignal(move);

  const handleIncrement = (signal: Signal<number>) => {
    if (signal.value >= 0 && unallocatedPoints > 0) {
      signal.value++;
      onPointsChange(-1);
    }
  };

  const handleDecrement = (signal: Signal<number>) => {
    if (signal.value > 0) {
      signal.value--;
      onPointsChange(1);
    }
  };

  const counters = Object.entries(statsSignals).map(([key, signal]) => (
    <Fragment key={key}>
      {/* <div class="flex gap-8 py-6 items-center justify-between"> */}
      <div class="grid-cols-2">
        <label class="font-bold" for={`${move?.move}-${key}`}>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
        <div class="flex  items-center justify-between">
          <Button
            type="button"
            onClick={() =>
              handleDecrement(signal)}
            aria-label={`Decrease ${key}`}
          >
            -1
          </Button>
          <p class="text-3xl tabular-nums" id={`${move?.move}-${key}`}>
            {signal.value}
          </p>
          <input
            type="hidden"
            name={key}
            value={signal.value}
          />
          <Button
            type="button"
            onClick={() => handleIncrement(signal)}
            aria-label={`Increase ${key}`}
          >
            +1
          </Button>
        </div>
      </div>
    </Fragment>
  ));
  return (
    <div>
      <div class="text-2xl font-bold text-center">
        <label for="move-name">Move Name</label>
        {/* if we have a move name, we want to just return an unmodifiable <input> */}
        <input
          id="move-name"
          class="text-center"
          placeholder={move ? move.move : "New Move"}
          value={moveSignal.value?.move}
          name="move"
        />
      </div>
      {counters}
    </div>
  );
}

interface CreateMoveFormsProps {
  player: Player;
}

export default function CreateMoveForms({ player }: CreateMoveFormsProps) {
  // Calculate the number of additional new move forms to display
  const unallocatedPoints = useSignal(player.unspentPoints);
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
    console.log("Form data:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("/api/data/player", {
        method: "POST",
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
        {/* this doesn't need to be an array because the length will just be 1 but not important rn */}
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
