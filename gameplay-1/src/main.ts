import Phaser from "phaser";

class Battle extends Phaser.Scene {
  gw: number;
  gh: number;
  constructor() {
    super("Battle");
    this.gw = 0;
    this.gh = 0;

  }
  preload() {
    this.load.svg("button", "src/typescript.svg")
  }
  create() {
    this.gw = this.game.config.width as number;
    this.gh = this.game.config.height as number;
    const button1 = this.add.nineslice(this.gw * 1 / 8, this.gh * 0.75, "button", undefined, 25, 10).setOrigin(0.5, 0.5);
    button1.setInteractive();
    button1.on('pointerdown', () => {
      t.setText("action 1");
      tAnim();
    });
    const button2 = this.add.nineslice(this.gw * 3 / 8, this.gh * 0.75, "button", undefined, 25, 10).setOrigin(0.5, 0.5);
    button2.setInteractive();
    button2.on('pointerdown', () => {
      t.setText("action 2");
      tAnim();
    });
    const button3 = this.add.nineslice(this.gw * 5 / 8, this.gh * 0.75, "button", undefined, 25, 10).setOrigin(0.5, 0.5);
    button3.setInteractive();
    button3.on('pointerdown', () => {
      t.setText("action 3");
      tAnim();
    });
    const button4 = this.add.nineslice(this.gw * 7 / 8, this.gh * 0.75, "button", undefined, 25, 10).setOrigin(0.5, 0.5);
    button4.setInteractive();
    button4.on('pointerdown', () => {
      t.setText("action 4");
      tAnim();
    });

    const t = this.add.text(this.gw * 0.5, this.gh * 0.25, "Battle", { fontSize: "32px" }).setOrigin(0.5, 0.5);
    t.setVisible(false);
    
    const tAnim = () => {
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
      })
    }
    tAnim.bind(this)
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
