import {createImage} from '@/utils';

export interface ActionTypeOptsProps {
    name: string;
    frameNums: number;
}

export const ActionTypeOpts: ActionTypeOptsProps[] = [
    {
        name: 'normal',
        frameNums: 7,
    },
    {
        name: 'jump',
        frameNums: 7,
    },
    {
        name: 'fall',
        frameNums: 7,
    },
    {
        name: 'run',
        frameNums: 9,
    },
    {
        name: 'dizzy',
        frameNums: 11,
    },
    {
        name: 'sit',
        frameNums: 5,
    },
    {
        name: 'roll',
        frameNums: 7,
    },
    {
        name: 'bite',
        frameNums: 7,
    },
    {
        name: 'ko',
        frameNums: 12,
    },
    {
        name: 'get-hit',
        frameNums: 4,
    },
];

interface LayerProps {
    image: HTMLImageElement
}


export class Layer {
    image: HTMLImageElement;
    speedMulti: number;
    width: number;
    height: number;
    x: number;
    y: number;
    x2: number;
    speed: number;
    ctx: CanvasRenderingContext2D;
    static CONSTANT_SPEED = 15;

    constructor(imgPath: string, speedMulti: number, ctx: CanvasRenderingContext2D) {
        this.image = createImage(imgPath);
        this.speedMulti = speedMulti;
        this.width = 2400;
        this.height = 700;
        this.x = 0;
        this.y = 0;
        this.x2 = this.width;
        this.speed = speedMulti * Layer.CONSTANT_SPEED;
        this.ctx = ctx;
    }

    update() {
        if (this.x < -this.width) {
            this.x = this.width + this.x2 - this.speed;
        } else {
            this.x = Math.floor(this.x - this.speed);
        }
        if (this.x2 < -this.width) {
            this.x2 = this.width + this.x - this.speed;
        } else {
            this.x2 = Math.floor(this.x2 - this.speed);
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
