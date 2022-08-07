import {createImage} from '@/utils';

import layer1 from '@/assets/img/backgroundLayers/layer-1.png';
import layer2 from '@/assets/img/backgroundLayers/layer-2.png';
import layer3 from '@/assets/img/backgroundLayers/layer-3.png';
import layer4 from '@/assets/img/backgroundLayers/layer-4.png';
import layer5 from '@/assets/img/backgroundLayers/layer-5.png';

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
    baseSpeed: number;

    constructor(imgPath: string, speedMulti: number, ctx: CanvasRenderingContext2D) {
        this.image = createImage(imgPath);
        this.speedMulti = speedMulti;
        this.width = 2400;
        this.height = 700;
        this.x = 0;
        this.y = 0;
        this.x2 = this.width;
        this.baseSpeed = 15;
        this.speed = speedMulti * this.baseSpeed;
        this.ctx = ctx;
    }

    updateSpeed(inputSpeed: number) {
        this.baseSpeed = inputSpeed;
        this.speed = this.speedMulti * this.baseSpeed;
    }

    update() {
        if (this.x < -this.width) {
            this.x = this.width + Math.floor(this.x2 - this.speed);
        } else {
            this.x = Math.floor(this.x - this.speed);
        }
        if (this.x2 < -this.width) {
            this.x2 = this.width + Math.floor(this.x - this.speed);
        } else {
            this.x2 = Math.floor(this.x2 - this.speed);
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

export const layerParamsArr = [
    {
        imgPath: layer1,
        speedMulti: 0.2
    },
    {
        imgPath: layer2,
        speedMulti: 0.4
    },
    {
        imgPath: layer3,
        speedMulti: 0.6
    },
    {
        imgPath: layer4,
        speedMulti: 0.8
    },
    {
        imgPath: layer5,
        speedMulti: 1
    }
];
