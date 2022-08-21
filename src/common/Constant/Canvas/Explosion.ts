import {createImage} from '@/utils';
import {ExplosionOptions, ExplosionParams} from '@/common/Interface';
import boomPic from '@/assets/img/boom.png';
export class Explosion {
    updateCnt: number;
    frameX: number;
    options: ExplosionParams;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    angle: number;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: ExplosionOptions
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.options = {
            ...options,
            image: createImage(options.imgPath)
        };
        this.updateCnt = 1;
        this.frameX = 0;
        this.x = options.x;
        this.y = options.y;
        this.angle = Math.random() * 6.2;
    }

    update() {
        const {separator} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX += 1;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
    }

    draw() {
        const {spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.options.image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            0 - ((spriteWidth * ratio) / 2), 0 - ((spriteHeight * ratio) / 2), spriteWidth * ratio, spriteHeight * ratio
        );
        this.ctx.restore();
    }
}

export const ExplosionBaseOptions = {
    separator: 7,
    spriteWidth: 200,
    spriteHeight: 179,
    imgPath: boomPic,
    frames: 5,
    ratio: 0.5,
};
