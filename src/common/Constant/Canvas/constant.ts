import {createImage} from '@/utils';
import {EnemyOptions, EnemyParams} from '@/common/Interface';

import layer1 from '@/assets/img/backgroundLayers/layer-1.png';
import layer2 from '@/assets/img/backgroundLayers/layer-2.png';
import layer3 from '@/assets/img/backgroundLayers/layer-3.png';
import layer4 from '@/assets/img/backgroundLayers/layer-4.png';
import layer5 from '@/assets/img/backgroundLayers/layer-5.png';

import enemy1Pic from '@/assets/img/enemies/enemy1.png';
import enemy2Pic from '@/assets/img/enemies/enemy2.png';
import enemy3Pic from '@/assets/img/enemies/enemy3.png';
import enemy4Pic from '@/assets/img/enemies/enemy4.png';

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

export class Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    options: EnemyParams;
    updateCnt: number;
    frameX: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    move: number;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: EnemyOptions
    ) {
        const {moveSpeed = 1} = options;

        this.frameX = 0;
        this.options = {
            ...options,
            image: createImage(options.imgPath)
        };
        this.ctx = ctx;
        this.updateCnt = 0;
        const {width: canvasW, height: canvasH} = canvas;
        this.canvas = canvas;
        const {random} = Math;
        this.x = random() * canvasW;
        this.y = random() * canvasH;
        this.speedX = (random() * moveSpeed) - (moveSpeed / 2);
        this.speedY = (random() * moveSpeed) - (moveSpeed / 2);
        this.move = 0;
    }

    update() {
        return;
    }

    draw() {
        return;
    }
}

export class Enemy1 extends Enemy {
    update() {
        const {moveSpeed = 1} = this.options;
        const {frames, separator} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
        this.move = (Math.random() * moveSpeed) - (moveSpeed / 2);
        this.x = this.x + this.move * this.speedX;
        this.y = this.y + this.move * this.speedY;
    }
    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth / ratio, spriteHeight / ratio
        );
    }
}

export class Enemy2 extends Enemy {
    options: EnemyParams;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: EnemyOptions
    ) {
        super(canvas, ctx, options);
        this.options = {
            ...options,
            image: createImage(options.imgPath)
        };
    }
    update() {
        const {moveSpeed = 1, curve = 10, angleSpeed = 0.2, spriteWidth} = this.options;
        const {frames, separator} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
        this.x -= moveSpeed;
        if (this.x < -spriteWidth) {
            this.x = this.canvas.width;
        }
        this.move += angleSpeed;
        this.y += Math.sin(this.move) * curve;
    }
    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth / ratio, spriteHeight / ratio
        );
    }
}

export class Enemy3 extends Enemy {
    baseX: number;
    baseY: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: EnemyOptions
    ) {
        super(canvas, ctx, options);
        const {spriteWidth, spriteHeight, ratio} = this.options;
        this.baseX = this.canvas.width / 2 - spriteWidth / (2 * ratio);
        this.baseY = this.canvas.height / 2 - spriteHeight / (2 * ratio);
    }
    update() {
        const {angleSpeed = 0.2, separator, frames} = this.options;
        this.move += angleSpeed;
        /**
         * change the 'curve' part to see different animation.
         * example: canvas.width / 2, canvas.height / 2
         * this.x = this.baseX + Math.sin(this.move * Math.PI / 90) * curve;
         * this.y = this.baseY + Math.cos(this.move * Math.PI / 270) * curve;
         */
        this.x = this.baseX + Math.sin(this.move * Math.PI / 90) * this.canvas.width / 2;
        this.y = this.baseY + Math.cos(this.move * Math.PI / 270) * this.canvas.height / 2;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
    }
    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth / ratio, spriteHeight / ratio
        );
    }
}

export class Enemy4 extends Enemy {
    nxtX: number;
    nxtY: number;
    interval: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: EnemyOptions
    ) {
        super(canvas, ctx, options);
        this.nxtX = Math.random() * (this.canvas.width);
        this.nxtY = Math.random() * (this.canvas.height);
        this.x = Math.random() * (this.canvas.width);
        this.y = Math.random() * (this.canvas.height);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        const {frames} = this.options;
        /**
         * set the interval to a certain and small value, 1 for example.
         * All the enemies will move to a certain point of canvas.
         * I think it can be explained from mathematical point of view, but don't know the excatlly answer.
         */
        if (this.updateCnt % this.interval === 0) {
            this.frameX = (this.frameX + 1) % frames;
            this.nxtX = Math.random() * (this.canvas.width);
            this.nxtY = Math.random() * (this.canvas.height);
            // this.nxtX = 10;
            // this.nxtY = 20;
        }
        const difX = this.x - this.nxtX;
        const difY = this.y - this.nxtY;
        this.x -= difX / 70;
        this.y -= difY / 70;
        this.updateCnt = (this.updateCnt + 1) % this.interval;
    }
    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, 0, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth / ratio, spriteHeight / ratio
        );
    }
}

export const enemyParamsMap: {
    [key: string]: {
        options: EnemyOptions,
        Contructor: typeof Enemy
    }
} = {
    enemy1: {
        options: {
            spriteWidth: 293,
            spriteHeight: 155,
            imgPath: enemy1Pic,
            frames: 6,
            separator: 1,
            ratio: 3,
        },
        Contructor: Enemy1
    },
    enemy2: {
        options: {
            spriteWidth: 266,
            spriteHeight: 188,
            imgPath: enemy2Pic,
            frames: 6,
            separator: 3,
            ratio: 3,
        },
        Contructor: Enemy2
    },
    enemy3: {
        options: {
            spriteWidth: 218,
            spriteHeight: 177,
            imgPath: enemy3Pic,
            frames: 6,
            separator: 3,
            ratio: 3,
            curve: 200,
        },
        Contructor: Enemy3
    },
    enemy4: {
        options: {
            spriteWidth: 213,
            spriteHeight: 213,
            imgPath: enemy4Pic,
            frames: 6,
            separator: 2,
            ratio: 3,
            curve: 200,
        },
        Contructor: Enemy4
    }
};
