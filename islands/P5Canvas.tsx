// deno-lint-ignore-file
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { language_translate } from "gameData/locale.ts";
import {
  Player,
  PlayerMove,
  PlayerStats,
  symbolMap,
} from "gameData/playerStats.ts";

import { playerGainExperience } from "../utils/db.ts";
import * as Dialog from "../gameData/dialog.json" with { type: "json" };

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
function dispatchMove(moveNum: number) {
  globalThis.dispatchEvent(new CustomEvent(`move${moveNum}`));
}

const dialogArray = Object.entries(Dialog.default).map(([key, value]) => {
  return value;
});

function createDialogIterator() {
  let currentIndex = 0;

  return {
    next: function () {
      const currentValue = dialogArray[currentIndex];
      currentIndex = (currentIndex + 1) % dialogArray.length;
      return currentValue;
    },
  };
}
interface P5CanvasProps {
  user: Player;
  playerMoves: PlayerMove[];
  interviewData: PlayerStats;
  language: string;
}

interface GameManager {
  playerAnswer: (move: PlayerMove) => void;
  questionPrompt: string;
  currentQuestion: PlayerStats;
  persuasion: number;
  winScreen: () => void;
  loseScreen: () => void;
  gameOver: boolean;
}
export default function P5Canvas(
  { user, interviewData, playerMoves, language }: P5CanvasProps,
) {
  const backPathname: string = user !== null ? "/worldMap" : "/";
  const retryPathname: string = "/interview";

  const movesJSX = playerMoves.map((move, index) => {
    let titleString = "";
    for (const [stat, value] of Object.entries(move.pointsAllocated)) {
      titleString += `${
        symbolMap[stat as keyof typeof symbolMap]
      }: ${value} \n`;
    }
    return (
      <Button
        title={titleString}
        class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
        onClick={() => {
          dispatchMove(index);
        }}
      >
        {move.move}
      </Button>
    );
  });

  const dialogIterator = createDialogIterator();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
    const winDialog = document.getElementById("winDialog") as HTMLDialogElement;
    const loseDialog = document.getElementById(
      "loseDialog",
    ) as HTMLDialogElement;

    const gameManager: GameManager = {
      playerAnswer: function (move: PlayerMove) {
        if (this.gameOver) return;
        globalThis.dispatchEvent(new CustomEvent(`move${move}`));
        for (
          const [stat, idx] of Object.entries(interviewData) as [
            keyof PlayerStats,
            number,
          ][]
        ) {
          const newVal = Math.floor(Math.random() * idx);
          this.currentQuestion[stat] = newVal;
        }

        let change = 0;
        for (
          const stat of Object.keys(
            move.pointsAllocated,
          ) as (keyof PlayerStats)[]
        ) {
          const expected = this.currentQuestion[stat];
          const playerVal = move.pointsAllocated[stat];
          const result = playerVal - expected;
          if (result >= 0) {
            // + 10 because if you just satisfy the requirement, that's good
            change += (result + 1) / 100;
          } else if (result < 0) {
            // divide by 10 because if you don't satisfy the requirement, that's worse than over satisfying it
            change += result / 10;
          }
        }

        this.persuasion += change;

        if (this.persuasion >= 1) {
          this.persuasion = 1;
          this.gameOver = true;
          this.winScreen();
        } else if (this.persuasion <= 0) {
          this.persuasion = 0;
          this.gameOver = true;
          this.loseScreen();
        } else {
          this.questionPrompt = dialogIterator.next() as string;
        }
      },
      questionPrompt: dialogIterator.next() as string,
      //have to add this bc we don't want to mutate the original object
      currentQuestion: Object.assign({}, interviewData) as PlayerStats,
      persuasion: 0.5,
      winScreen: async () => {
        const sum = Object.values(interviewData).reduce((acc, curr) => {
          return acc + curr;
        }, 0);
        const exp = sum * user.level;
        console.log("experience gained", exp);
        const fd = new FormData();
        fd.append("experienceGained", exp.toString());
        await fetch("/api/data/experience", {
          method: "POST",
          body: fd,
        });

        winDialog.showModal();
      },
      loseScreen: () => {
        loseDialog.showModal();
      },
      gameOver: false,
    };
    script.onload = () => {
      //@ts-ignore
      new p5((p: any) => {
        let bgImg: any;
        p.preload = function () {
          bgImg = p.loadImage(`/battle${user.level > 1 ? 2 : 1}.png`);
        };
        p.setup = function () {
          const maxWidth = window.innerWidth * 0.8; // Maximum width constraint (80% of window width)
          const maxHeight = window.innerHeight * 0.8; // Maximum height constraint (80% of window height)

          const scaledWidth = Math.min(bgImg.width, maxWidth);
          const scaledHeight = Math.min(bgImg.height, maxHeight);

          const scale = Math.min(
            scaledWidth / bgImg.width,
            scaledHeight / bgImg.height,
          );

          const canvasWidth = bgImg.width * scale;
          const canvasHeight = bgImg.height * scale;

          p.createCanvas(canvasWidth, canvasHeight).parent("p5-canvas");
          p.background(bgImg);
          p.textSize(16 * scale);

          p.text(
            language_translate("PERSUASION_METER", language),
            p.width * 0.2,
            p.height * 0.85,
          );

          for (const [idx, move] of Object.entries(playerMoves)) {
            globalThis.addEventListener(`move${idx}`, () => {
              gameManager.playerAnswer(move);
            });
          }
        };

        p.draw = function () {
          //clear the canvas
          p.background(bgImg);

          p.fill(255);
          const barWidth = p.width * 0.6;
          const barHeight = p.height * 0.1;
          const barX = (p.width - barWidth) / 2;
          const barY = p.height - barHeight - p.height * 0.04;
          p.rect(barX, barY, barWidth, barHeight);

          p.fill("cadetblue");
          p.rect(barX, barY, barWidth * gameManager.persuasion, barHeight);

          p.fill(0); // Set text color to black
          p.textSize(16); // Set text size
          p.textAlign(p.CENTER, p.CENTER); // Set text alignment to center
          const primaryStat =
            Object.entries(gameManager.currentQuestion).reduce(
              (acc, [key, value]) => {
                return value > acc[1] ? [key, value] : acc;
              },
              ["", 0],
            )[0];
          // Draw text for the bar
          p.text(
            `${gameManager.questionPrompt} ${
              symbolMap[primaryStat as keyof typeof symbolMap]
            }`,
            p.width / 2,
            barY - 20,
          );
        };

        p.goTo = function (link: string) {
          window.location.href = link;
        };
      }, document.body);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>

      <dialog
        style={{
          position: "fixed",
          top: "20%",
          left: "15%",
          // transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 0 1rem rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          width: "fit-content", // Add this line
        }}  id="winDialog"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{language_translate("YOU_WIN", language)}</h2>
          <button class="backdrop-contrast-50" onClick={() => window.location.pathname = backPathname}>
            {language_translate("BACK_TO_MAP", language)}
          </button>
        </div>
      </dialog>

      <dialog
        style={{
          position: "fixed",
          top: "20%",
          left: "15%",
          // transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 0 1rem rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          width: "fit-content", // Add this line
        }}
        
        id="loseDialog"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{language_translate("YOU_LOSE", language)}</h2>
          <button class="backdrop-contrast-50" onClick={() => window.location.pathname = backPathname}>
            {language_translate("BACK_TO_MAP", language)}
          </button>
        </div>
      </dialog>
      <div>
        <div id="p5-canvas"></div>
        <div class="mx-auto flex flex-row items-center justify-center">
          {movesJSX}
        </div>
      </div>
    </>
  );
}
