import shadowDogPic from '@/assets/img/shadow_dog.png';
import {ShadowOptios, ShadowActionType} from '@/common/Interface';
import {BaseEle} from './BaseEle';

export class ShadowDogClass extends BaseEle {
    yPosForSprite: number;
    yDirection: number;
    jumping: boolean;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: ShadowOptios
    ) {
        super(canvas, ctx, options);
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.yPosForSprite = yPosForShadwDogSprite['updateNormal'];
        this.yDirection = -10 * Math.sin(90);
        this.jumping = false;
    }

    changeType(actionType: ShadowActionType) {
        this.yPosForSprite = yPosForShadwDogSprite[actionType];
        this.options = {
            ...this.options,
            frames: framesForActionType[actionType]
        };
    }

    update() {
        super.update();
    }

    draw() {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, this.yPosForSprite, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth * ratio, spriteHeight * ratio
        );
    }
    
}

export const ActionTypeOpts: ShadowActionType[] = [
    'updateNormal',
    'updateJump',
    'updateFall',
    'updateRun',
    'updateDizzy',
    'updateSit',
    'updateRoll',
    'updateBit',
    'updateKo',
    'updateGetHit'
];

export const shadowDogOptions: ShadowOptios = {
    spriteWidth: 575,
    spriteHeight: 523,
    imgPath: shadowDogPic,
    frames: 6,
    separator: 4,
    ratio: 1
};

export const yPosForShadwDogSprite: {
    [K in ShadowActionType]: number
} = {
    'updateNormal': 0,
    'updateJump': shadowDogOptions.spriteHeight,
    'updateFall': shadowDogOptions.spriteHeight * 2,
    'updateRun': shadowDogOptions.spriteHeight * 3,
    'updateDizzy': shadowDogOptions.spriteHeight * 4,
    'updateSit': shadowDogOptions.spriteHeight * 5,
    'updateRoll': shadowDogOptions.spriteHeight * 6,
    'updateBit': shadowDogOptions.spriteHeight * 7,
    'updateKo': shadowDogOptions.spriteHeight * 8,
    'updateGetHit': shadowDogOptions.spriteHeight * 9,
};

export const framesForActionType: {
    [K in ShadowActionType]: number
} = {
    'updateNormal': 7,
    'updateJump': 7,
    'updateFall': 7,
    'updateRun': 9,
    'updateDizzy': 11,
    'updateSit': 5,
    'updateRoll': 7,
    'updateBit': 7,
    'updateKo': 12,
    'updateGetHit': 4,
};
