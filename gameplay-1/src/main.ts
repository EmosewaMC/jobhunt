import Phaser from "phaser";

class Battle extends Phaser.Scene {
    tAnim: (displayString: string) => void;  // Function to be defined later
    constructor() {
        super("Battle");
        this.tAnim = () => {};  // Dummy function to prevent errors 
    }

    preload() {
        this.load.svg("button", "src/typescript.svg");
    }

    create() {
        const gw = this.game.config.width as number;
        const gh = this.game.config.height as number;

        // Simplified button creation
        this.createButton(gw * 1 / 8, gh * 0.75, "action 1");
        this.createButton(gw * 3 / 8, gh * 0.75, "action 2");
        this.createButton(gw * 5 / 8, gh * 0.75, "action 3");
        this.createButton(gw * 7 / 8, gh * 0.75, "action 4");

        // Text and its animation
        const t = this.add.text(gw * 0.5, gh * 0.25, "Battle", { fontSize: "32px" }).setOrigin(0.5, 0.5);
        t.setVisible(false);
        
        const tAnim = (displayString: string) => {
            t.setText(displayString);
            t.setVisible(true);
            this.tweens.add({
                targets: t,
                alpha: 1,
                duration: 1000,
                ease: 'Linear',
                yoyo: true,
                onComplete: () => {
                    t.setVisible(false);
                }
            });
        };

        this.tAnim = tAnim.bind(this);  // Ensure 'this' context is preserved
    }

    createButton(x: number, y: number, actionText: string) {
        const button = this.add.nineslice(x, y, "button", undefined, 25, 10).setOrigin(0.5, 0.5);
        button.setInteractive();
        button.on('pointerdown', () => {
            this.tAnim(actionText );  // Call the animation function
            console.log(actionText);  // Log the action for debugging
        });
    }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth * 0.8,
  height: window.innerWidth * 0.8,
  scene: [Battle],
};

// @ts-ignore
const game = new Phaser.Game(config);
