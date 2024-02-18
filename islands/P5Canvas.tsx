// deno-lint-ignore-file
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
function dispatchMove(moveNum: number) {
  globalThis.dispatchEvent(new CustomEvent("move" + moveNum));
}
export default function P5Canvas() {
  useEffect(() => {
    // Dynamically load p5.js
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
    script.onload = () => {
    //deno-lint-ignore
      new p5((p: any) => {
        let bgImg: any;
        let persuasion = 0.5
        p.preload = function () {
            bgImg = p.loadImage("/interview_sketch.png");
        };
        p.setup = function () {
          p.createCanvas(bgImg.width, bgImg.height).parent("p5-canvas");
          p.background(bgImg);
        };

        p.draw = function () {
          p.fill(255);
          let barWidth = p.width * 0.6
          let barHeight = p.height * 0.1
          let barX = (p.width - barWidth) / 2
          let barY = p.height - barHeight - p.height * 0.04
          p.rect(barX, barY, barWidth, barHeight)

          p.fill('cadetblue')
          p.rect(barX, barY, barWidth * persuasion, barHeight)
        };
        globalThis.addEventListener("move1", () => {
          persuasion += 0.2
        });
        globalThis.addEventListener("move2", () => {
          persuasion += 0.1
        });
        globalThis.addEventListener("move3", () => {
          persuasion -= 0.2
        });
        globalThis.addEventListener("move4", () => {
          persuasion -= 0.1
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
