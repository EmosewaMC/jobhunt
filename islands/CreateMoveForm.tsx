import { Button } from "../components/Button.tsx";
import { Player, PlayerMove, PlayerStats } from "gameData/playerStats.ts";
import { Signal, useSignal } from "@preact/signals";
import { Fragment } from "preact";
// import { language_translate } from "gameData/locale.ts";
// import { translate } from "gameData/locale.ts";

interface MoveFormProps {
  index: number;
  move: PlayerMove | null; // null indicates a new move form
  onPointsChange: (delta: number) => void; // Function to handle point allocation changes
  unallocatedPoints: number;
}

function MoveForm(
  { index, move, onPointsChange, unallocatedPoints }: MoveFormProps,
) {
  const statsSignals = Object.entries(
    move
      ? move.pointsAllocated
      : { charisma: 0, motivation: 0, technicalSkills: 0, likability: 0 },
  ).reduce((acc, [key, value]) => {
    acc[key] = useSignal(value);
    return acc;
  }, {} as Record<string, Signal<number>>);
  const moveSignal  = useSignal(move) as Signal<PlayerMove>;
  const handleNameChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    moveSignal.value = { ...moveSignal.value, move: target.value };
  }

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
            name={`moves[${index}].${key}`}
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
          id={`move-name-${index}`}
          class="text-center"
          placeholder={move ? move.move : "New Move"}
          value={moveSignal.value?.move}
          onChange={handleNameChange}
          // readOnly={move !== null}
          name={`moves[${index}].move`}
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

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const moves: PlayerMove[] = [];

    // Parse the FormData entries
    for (const [key, value] of formData.entries()) {
      const keyMatch = key.match(/^moves\[(\d+)]\.(.+)/);
      if (keyMatch) {
        const [_, indexStr, attribute] = keyMatch;
        const index = parseInt(indexStr, 10);

        moves[index] = moves[index] || { move: "", pointsAllocated: {} };

        if (attribute === "move") {
          // @ts-ignore: FormDataEntryValue is a string
          moves[index].move = value;
        } else {
          // @ts-ignore: FormDataEntryValue is a string
          moves[index].pointsAllocated[attribute] = parseInt(value, 10);
        }
      }
    }

    // Update player object
    const updatedPlayer = {
      ...player,
      moves,
      unspentPoints: unallocatedPoints.value,
    };

    console.log("Updated Player:", updatedPlayer);
    const fd = new FormData();
    fd.append("player", JSON.stringify(updatedPlayer));
    console.log("Form Data:", fd);

    try {
      const response = await fetch("/api/data/player", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Optionally, process the response data if needed
      const responseData = await response.json();
      console.log("Server Response:", responseData);

      // Here you might want to update the UI or state based on the response
      // For example, show a success message, reset form, or update local player data
    } catch (error) {
      console.error("Failed to update player data:", error);
      // Here you could show an error message to the user or retry the request
    }
  };

  const canMakeNewMove = player.moves.length - player.level &&
    player.moves.length <= 4;
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <p>Unallocated Points: {unallocatedPoints.value}</p>
        {player.moves.map((move, index) => (
          <MoveForm
            index={index}
            key={index}
            move={move}
            onPointsChange={handlePointsChange}
            unallocatedPoints={unallocatedPoints.value}
          />
        ))}
        {canMakeNewMove
          ? (
            <MoveForm
              index={player.moves.length}
              key={player.moves.length}
              move={{
                move: "",
                pointsAllocated: {
                  charisma: 0,
                  motivation: 0,
                  technicalSkills: 0,
                  likability: 0,
                },
              }}
              onPointsChange={handlePointsChange}
              unallocatedPoints={unallocatedPoints.value}
            />
          )
          : null}
        <Button type="submit">Submit</Button>
      </form>
    </Fragment>
  );
}
