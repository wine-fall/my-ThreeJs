import {createImage} from '@/utils';
import {RavenOptions, RavenParams} from '@/common/Interface';
import ravenPic from '@/assets/img/raven.png';

export class Raven {
    options: RavenParams;
    frameX: number;
    updateCnt: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    directionY: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: RavenOptions
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.options = {
            ...options,
            image: createImage(options.imgPath)
        };
        this.frameX = 0;
        this.updateCnt = 0;
        this.x = this.OriginX;
        this.y = this.OriginY;
        this.directionY = this.directionYFlag;
    }

    get OriginX() {
        return Math.random() * this.canvas.width;
    }

    get OriginY() {
        return Math.random() * this.canvas.height;
    }

    get directionYFlag() {
        return ((Math.random() - 0.5) > 0 ? 1 : -1);
    }

    update() {
        const {separator, frames, speedX, speedY, spriteWidth, spriteHeight, ratio} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
        this.x -= speedX;
        if (this.x < 0 - spriteWidth * ratio) {
            this.x = this.canvas.width;
        }
        this.y += this.directionY * speedY;
        if (this.y > this.canvas.height - spriteHeight * ratio || this.y < 0) {
            this.directionY = -this.directionY;
        }
        return;
    }
    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.strokeRect(this.x, this.y, spriteWidth * ratio, spriteHeight * ratio);
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth * ratio, spriteHeight * ratio
        );
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
    speedX: 5,
    speedY: 2
};