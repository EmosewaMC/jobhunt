// deno-lint-ignore-file
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { language_translate } from "gameData/locale.ts";
import { Player, PlayerMove, PlayerStats} from "gameData/playerStats.ts";

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
function dispatchMove(moveNum: number) {
  console.log("dispatching move", `move${moveNum}`);
  globalThis.dispatchEvent(new CustomEvent(`move${moveNum}`));
}
interface P5CanvasProps {
  user: Player;
  playerMoves: PlayerMove[];
  interviewData: PlayerStats;
  language: string
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
export default function P5Canvas({ user, interviewData, playerMoves, language }: P5CanvasProps) {
  const backPathname: string = user !== null ? "/worldMap" : "/";
  const retryPathname: string = "/interview";
  console.log("interviewData", interviewData);
  console.log("playerMoves", playerMoves);

  const movesJSX = playerMoves.map((move, index) => {  
    return <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
              dispatchMove(index);
            }}
          >
          {move.move}
          </Button>
  });

  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
    script.onload = () => {
    //@ts-ignore
      new p5((p: any) => {
        let bgImg: any;
        p.preload = function () {
            bgImg = p.loadImage("/interview_sketch.png");
        };
        p.setup = function () {
          p.createCanvas(bgImg.width, bgImg.height).parent("p5-canvas");
          p.background(bgImg);
          p.textSize(16)
          p.text(language_translate("PERSUASION_METER", language), p.width * 0.2, p.height * 0.85)
        };

        const winDialog = document.getElementById('winDialog') as HTMLDialogElement;
        const loseDialog = document.getElementById('loseDialog') as HTMLDialogElement;

        const gameManager : GameManager = {
          playerAnswer: function(move: PlayerMove) {
            if(this.gameOver) return;
            globalThis.dispatchEvent(new CustomEvent(`move${move}`));
            
            // console.log('interview data: ', Object.entries(interviewData));
            // for (const [stat, idx ] of Object.entries(interviewData) ){
            //   this.currentQuestion[stat] = 1 + Math.floor( Math.random() * interviewData[stat]);
            // }
            let change = 0;
            for(const stat of Object.keys(move.pointsAllocated) as (keyof PlayerStats)[]) {
              const expected = this.currentQuestion[stat];
              const playerVal = move.pointsAllocated[stat];
              const result = playerVal - expected;
              if(result >= 0) {
                // + 10 because if you just satisfy the requirement, that's good
                change += (result + 10) / 100;
              } else if(result < 0) {
                // divide by 10 because if you don't satisfy the requirement, that's worse than over satisfying it
                change += (result) / 10;
              }
            }

            this.persuasion += change;

            if(this.persuasion >= 1) {
              this.winScreen();
            } else if(this.persuasion <= 0) {
              this.loseScreen();
            }
          },
          questionPrompt: "What is your answer?",
          currentQuestion: interviewData,
          persuasion: 0.5,
          winScreen: () => {
            winDialog.showModal();
          },
          loseScreen: () => {
            loseDialog.showModal();
          },
          gameOver: false
        }
        

        p.draw = function () {
          p.fill(255);
          let barWidth = p.width * 0.6
          let barHeight = p.height * 0.1
          let barX = (p.width - barWidth) / 2
          let barY = p.height - barHeight - p.height * 0.04
          p.rect(barX, barY, barWidth, barHeight)

          p.fill('cadetblue')
          p.rect(barX, barY, barWidth * gameManager.persuasion, barHeight)
        };
        
        p.goTo = function (link: string) {
          window.location.href = link;
        }
        
        for(const [idx, move] of Object.entries(playerMoves)) {
          globalThis.addEventListener(`move${idx}`, () => {
            gameManager.playerAnswer(move);
          });
        }
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
          {movesJSX}
          
        </div>
      </div>
    </>
  );
}
