// deno-lint-ignore-file
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { language_translate } from "gameData/locale.ts";
import { Player, PlayerMove, PlayerStats} from "gameData/playerStats.ts";

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
function dispatchMove(moveNum: number) {
  globalThis.dispatchEvent(new CustomEvent("move" + moveNum));
}
interface P5CanvasProps {
  user: Player;
  playerMoves: PlayerMove[];
  interviewData: PlayerStats;
  language: string
}
export default function P5Canvas({ user, interviewData, playerMoves, language }: P5CanvasProps) {
  const backPathname: string = user !== null ? "/worldMap" : "/";
  const retryPathname: string = "/interview";
  console.log("interviewData", interviewData);
  console.log("playerMoves", playerMoves);
  
  useEffect(() => {
    // Dynamically load p5.js
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
    script.onload = () => {
    //@ts-ignore
      new p5((p: any) => {
        let bgImg: any;
        let persuasion = 0.5
        p.preload = function () {
            bgImg = p.loadImage("/interview_sketch.png");
        };
        p.setup = function () {
          p.createCanvas(bgImg.width, bgImg.height).parent("p5-canvas");
          p.background(bgImg);
          p.textSize(16)
          p.text(language_translate("PERSUASION_METER", language), p.width * 0.2, p.height * 0.85)
        };

        p.draw = function () {
          if (persuasion == 1) {
            p.winScreen()
          }
          if (persuasion == 0) {
            p.loseScreen()
          }
          p.fill(255);
          let barWidth = p.width * 0.6
          let barHeight = p.height * 0.1
          let barX = (p.width - barWidth) / 2
          let barY = p.height - barHeight - p.height * 0.04
          p.rect(barX, barY, barWidth, barHeight)

          p.fill('cadetblue')
          p.rect(barX, barY, barWidth * persuasion, barHeight)
        };
        const winDialog = document.getElementById('winDialog') as HTMLDialogElement;
        const loseDialog = document.getElementById('loseDialog') as HTMLDialogElement;
        p.winScreen = function () {
          winDialog.showModal();
        }

        p.loseScreen = function() {
          loseDialog.showModal();
        }
        
        p.goTo = function (link: string) {
          window.location.href = link;
        }
        
        globalThis.addEventListener("move1", () => {
          persuasion += 0.2
          if (persuasion > 1) {
            persuasion = 1
          }
        });
        globalThis.addEventListener("move2", () => {
          persuasion += 0.1
          if (persuasion > 1) {
            persuasion = 1
          }
        });
        globalThis.addEventListener("move3", () => {
          persuasion -= 0.2
          if (persuasion < 0) {
            persuasion = 0
          }
        });
        globalThis.addEventListener("move4", () => {
          persuasion -= 0.1
          if (persuasion < 0) {
            persuasion = 0
          }
        });
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
      <dialog id="winDialog">
        <h2>{language_translate("YOU_WIN", language)}</h2>
        <button onClick={ () => window.location.pathname = backPathname}>{language_translate("BACK_TO_MAP", language)}</button>
      </dialog>

      <dialog id="loseDialog">
        <h2>{language_translate("YOU_LOSE", language)}</h2>
        <button onClick={() => window.location.pathname = retryPathname}>{language_translate("RETRY?", language)}</button>
        <button onClick={() => window.location.pathname = backPathname}>{language_translate("BACK_TO_MAP", language)}</button>
      </dialog>
      <div>
        <div id="p5-canvas"></div>
        <div class="mx-auto flex flex-row items-center justify-center">
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
              dispatchMove(1);
            }}
          >
            move 1
          </Button>
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
                dispatchMove(2);
            }}
          >
            move 2
          </Button>
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
                dispatchMove(3);
            }}
          >
            move 3
          </Button>
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
                dispatchMove(4);
            }}
          >
            move 4
          </Button>
          
        </div>
      </div>
    </>
  );
}
