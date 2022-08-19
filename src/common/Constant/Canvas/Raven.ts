import {createImage} from '@/utils';
import {RavenOptions, RavenParams, CreateParticleFn} from '@/common/Interface';
import ravenPic from '@/assets/img/raven.png';

export class Raven {
    options: RavenParams;
    frameX: number;
    updateCnt: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    ctxWrapper: CanvasRenderingContext2D;
    x: number;
    y: number;
    directionY: number;
    color: string;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: RavenOptions,
        ctxWrapper: CanvasRenderingContext2D
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctxWrapper = ctxWrapper;
        this.options = {
            ...options,
            image: createImage(options.imgPath)
        };
        this.frameX = 0;
        this.updateCnt = 0;
        this.x = this.OriginX;
        this.y = this.OriginY;
        this.directionY = this.directionYFlag;
        this.color = this.RandomColor;
    }

    get OriginX() {
        return this.canvas.width;
    }

    get OriginY() {
        const {spriteHeight, ratio} = this.options;
        return Math.min(
            Math.random() * this.canvas.height,
            this.canvas.height - spriteHeight * ratio
        );
    }

    get directionYFlag() {
        return ((Math.random() - 0.5) > 0 ? 1 : -1);
    }

    get RandomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    update(createParticle: CreateParticleFn) {
        const {separator, frames, speedX, speedY, spriteHeight, spriteWidth, ratio} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
            createParticle(this.ctx, this.x, this.y, spriteWidth * ratio, this.color);
        }
        this.x -= speedX;
        this.y += this.directionY * speedY;
        this.updateCnt = (this.updateCnt + 1) % separator;
        if (this.y > this.canvas.height - spriteHeight * ratio || this.y < 0) {
            this.directionY = -this.directionY;
        }
        return;
    }
    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth * ratio, spriteHeight * ratio
        );
        this.ctxWrapper.fillStyle = this.color;
        this.ctxWrapper.fillRect(this.x, this.y, spriteWidth * ratio, spriteHeight * ratio);
        return;
    }
}

export const RavenBaseOptions: RavenOptions = {
    spriteWidth: 271,
    spriteHeight: 194,
    imgPath: ravenPic,
    frames: 6,
    separator: 10,
    ratio: 0.3,
    x: 0,
    y: 0,
    speedX: 3,
    speedY: 1
};