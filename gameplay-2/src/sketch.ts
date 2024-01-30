import p5 from 'p5';
import sdv from '/sdv.jpg'; //this needs to be root because vite treats public as root

new p5((p: p5) => {
    let img: p5.Image;
    let x = 200; // Initial x position of the stick figure
    let y = 200; // Initial y position of the stick figure
    const moveSpeed = 5; // Speed at which the stick figure moves

    p.preload = () => {
        img = p.loadImage(sdv);
    };

    const width = Math.min(window.innerWidth, 1920);
    const height = Math.min(window.innerHeight, 1080);

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
    };

    p.draw = () => {
        p.background("white"); // Redraw background to clear previous frame
        p.image(img, 0, 0, width, height);

        // Check if arrow keys are being held down and update position
        if (p.keyIsDown(p.LEFT_ARROW)) x -= moveSpeed;
        if (p.keyIsDown(p.RIGHT_ARROW)) x += moveSpeed;
        if (p.keyIsDown(p.UP_ARROW)) y -= moveSpeed;
        if (p.keyIsDown(p.DOWN_ARROW)) y += moveSpeed;

        // Draw the stick figure at position (x, y)
        drawStickFigure(x, y);
    };

    function drawStickFigure(x: number, y: number) {
        // Head
        p.strokeWeight(5);
        p.stroke("black");
        p.fill("white");
        p.circle(x, y, 50);
        // Smiley face
        p.fill("black");
        p.circle(x - 15, y - 10, 5);
        p.circle(x + 15, y - 10, 5);
        p.noFill();
        p.arc(x, y + 10, 20, 20, 0, p.PI);
        // Body
        p.line(x, y + 25, x, y + 100);
        // Legs
        p.line(x, y + 100, x - 25, y + 150);
        p.line(x, y + 100, x + 25, y + 150);
        // Arms
        p.line(x, y + 50, x - 25, y + 75);
        p.line(x, y + 50, x + 25, y + 75);
    }
});
