import {BaseEle} from '@/common/Constant/Canvas/BaseEle';
import white_dog from 'src/assets/img/white_dog.png';
import {Statement, StatementFallLeft, StatementFallRight, StatementJumpLeft, StatementJumpRight, StatementMap, StatementRunLeft, StatementRunRight, StatementStandLeft, StatementStandRight} from './Statement';

const PlayerOptions = {
    spriteWidth: 200,
    spriteHeight: 181.83,
    frames: 6,
    separator: 4,
    ratio: 0.5,
    imgPath: white_dog
};


export class Player extends BaseEle {

    public stateMap: Map<number, Statement>;
    public state: Statement;

    public speedX = 0;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) {
        super(canvas, ctx, PlayerOptions);
        this.y = canvas.height - PlayerOptions.spriteHeight * PlayerOptions.ratio;
        this.stateMap = new Map([
            [StatementMap.standing_left, new StatementStandLeft(this) as Statement],
            [StatementMap.standing_right, new StatementStandRight(this) as Statement],
            [StatementMap.running_right, new StatementRunRight(this) as Statement],
            [StatementMap.running_left, new StatementRunLeft(this) as Statement],
            [StatementMap.jumping_right, new StatementJumpRight(this) as Statement],
            [StatementMap.jumping_left, new StatementJumpLeft(this) as Statement],
            [StatementMap.falling_right, new StatementFallRight(this) as Statement],
            [StatementMap.falling_left, new StatementFallLeft(this) as Statement],
        ]);
        this.state = this.stateMap.get(StatementMap.standing_right)!;
    }    

    update() {
        const {frames, separator} = this.options;
        if (this.updateCnt % separator === 0) {
            this.frameX = (this.frameX + 1) % frames;
            this.x += this.speedX;
            if (this.x >= this.rightBoundary) {
                this.x = this.rightBoundary;
            }
            if (this.x <= this.leftBoundary) {
                this.x = this.leftBoundary;
            }
        }
        this.updateCnt = (this.updateCnt + 1) % separator;
        return;
    }

    get calSpriteWidth() {
        return this.options.spriteWidth * this.options.ratio;
    }

    get rightBoundary() {
        return this.canvas.width - this.calSpriteWidth;
    }

    get leftBoundary() {
        return 0;
    }

    draw(): void {
        const {image, spriteWidth, spriteHeight, ratio} = this.options;
        this.ctx.drawImage(image,
            this.frameX * spriteWidth, this.state.pos * spriteHeight, spriteWidth, spriteHeight,
            this.x, this.y, spriteWidth * ratio, spriteHeight * ratio
        );
    }
}