export class Particle {
    x: number;
    y: number;
    radius: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    maxRadius: number;
    speedX: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
        const diffVal = Math.min((Math.random() * radius) * 5, 50);
        this.x = x + radius / 2 + Math.random() * diffVal - (diffVal / 2);
        this.y = y + radius / 3 + Math.random() * diffVal - (diffVal / 2);
        this.radius = (Math.random() * radius) / 20 + 2;
        this.ctx = ctx;
        this.color = color;
        this.maxRadius = Math.random() * radius + 3;
        this.speedX = Math.random() * 1 + 0.5;
    }

    update() {
        this.radius += 0.5;
        this.x += this.speedX;
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }
}
