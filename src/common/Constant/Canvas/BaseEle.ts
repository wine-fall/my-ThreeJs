import {BaseOptions, BaseParams} from '@/common/Interface';
import {createImage} from '@/utils';

export class BaseEle {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    options: BaseParams;
    updateCnt: number;
    frameX: number;
    x: number;
    y: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: BaseOptions
    ) {
        this.frameX = 0;
        this.options = {
            ...options,
            image: createImage(options.imgPath)
        };
        this.ctx = ctx;
        this.updateCnt = 1;
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
    }

    get getOptions() {
        return this.options;
    }

    update() {
        const {frames, separator} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
        return;
    }

    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth * ratio, spriteHeight * ratio
        );
        return;
    }
}