import {createImage} from '@/utils';
import {ExplosionOptions, ExplosionParams} from '@/common/Interface';

export class Explosion {
    updateCnt: number;
    frameX: number;
    options: ExplosionParams;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

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
        this.updateCnt = 0;
        this.frameX = 0;
    }

    update() {
        const {separator} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % separator;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
    }

    draw() {
        const {width, height} = this.canvas;
        const {spriteWidth, spriteHeight, ratio, x, y} = this.options;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.drawImage(this.options.image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            x, y, spriteWidth / ratio, spriteHeight / ratio
        );
    }
}