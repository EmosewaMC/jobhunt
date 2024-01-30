import Phaser from "phaser";
class Battle extends Phaser.Scene {
    logContainer: string [];
    tAnim: (displayString: string) => void;  // Function to be defined later
    logDisplay: Phaser.GameObjects.Container | undefined;
    constructor() {
        super("Battle");
        this.tAnim = () => {};  // Dummy function to prevent errors 
        this.logContainer = [];
    }

    preload() {
        this.load.svg("button", "src/typescript.svg");
    }

    create() {
        
        const gw = this.game.config.width as number;
        const gh = this.game.config.height as number;
        const showLogBtn = this.add.rectangle(gw*0.7, gh*0.05, gw*0.4, gw* 0.05, 0x00beef, 1).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', this.displayLogs, this);
        this.add.text(showLogBtn.x, showLogBtn.y, "Show logs", { fontSize: "32px",  }).setOrigin(0.5, 0.5);
        this.logDisplay = this.add.container(showLogBtn.x, showLogBtn.y) as Phaser.GameObjects.Container;
        

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

    enemyAction(){
        const actions = ["action 1", "action 2", "action 3", "action 4"];
        const rand = Math.floor(Math.random() * actions.length);
        this.tAnim(`Enemy move: ${actions[rand]}`);
        this.logContainer.push(`Enemy move: ${actions[rand]}`);
    }

    createButton(x: number, y: number, actionText: string) {
        const button = this.add.nineslice(x, y, "button", undefined, 25, 10).setOrigin(0.5, 0.5);
        button.setInteractive();
        button.on('pointerdown', () => {
            this.tAnim(actionText );  // Call the animation function
            this.logContainer.push(`Player move: ${actionText}`);

            // Enemy action
            this.time.delayedCall(1000, this.enemyAction, [], this);
        });
    }

    displayLogs(){
        const gw = this.game.config.width as number;
        const gh = this.game.config.height as number;
        if (this.logDisplay) {
            // Toggle visibility
            this.logDisplay.setVisible(!this.logDisplay.visible);
    
            // Clear previous logs to avoid duplication
            this.logDisplay.removeAll(true);
    
            // Adjust container position if necessary
            this.logDisplay.setPosition(gw * 0.5, gh * 0.1);  // Center top or another suitable position
    
            // Set a higher depth to ensure visibility
            this.logDisplay.setDepth(10);
    
            // Re-add the logs
            let yPos = 0;
            for (const log of this.logContainer) {
                yPos += 32;  // Adjust spacing if necessary
                const t = this.add.text(0, yPos, log, { fontSize: "32px" }).setOrigin(0.5, 0);  // Centered horizontally
                this.logDisplay.add(t);
            }
        }
    }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerHeight * 0.8,
  height: window.innerHeight * 0.8,
  scene: [Battle],
};

// @ts-ignore
const game = new Phaser.Game(config);
