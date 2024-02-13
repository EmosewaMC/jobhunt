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
        let playerImg: any;
        let animate = false;
        let activeSeconds = 0;
        p.preload = function () {
            bgImg = p.loadImage("/2Q.png");
            playerImg = p.loadImage("/player.png");
        };
        p.setup = function () {
          p.createCanvas(bgImg.width * 2, bgImg.height * 2).parent("p5-canvas");
          p.background(bgImg);
          p.image(playerImg, 75, 75, playerImg.width * 0.75, playerImg.height * 0.75)
        };

        p.draw = function () {
          p.fill(255, 0, 0);
          let imgY = 75
          if (animate) {
            p.background(bgImg)
            imgY += p.random(-3, 3)
            activeSeconds += 0.1
            if (activeSeconds >= 5) {
              activeSeconds = 0
              animate = false
            }
            p.image(playerImg, 75, imgY, p)
          }
        };
        globalThis.addEventListener("move1", () => {
          animate = true
        });
        globalThis.addEventListener("move2", () => {
          // Perform some action on the canvas
          p.fill("red");
          p.ellipse(p.width / 2, p.height / 2, 100, 100); // Example action: draw a red circle
        });
        globalThis.addEventListener("move3", () => {
          // Perform some action on the canvas
          p.fill("red");
          p.ellipse(p.width / 2, p.height / 2, 100, 100); // Example action: draw a red circle
        });
        globalThis.addEventListener("move4", () => {
          // Perform some action on the canvas
          p.fill("red");
          p.ellipse(p.width / 2, p.height / 2, 100, 100); // Example action: draw a red circle
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
