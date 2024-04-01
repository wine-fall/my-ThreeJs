import {Player} from './Player';

export const StatementMap = {
    standing_right: 0,
    standing_left: 1,
    jumping_right: 2,
    jumping_left: 3,
    falling_right: 4,
    falling_left: 5,
    running_right: 6,
    running_left: 7
};

const RUNNING_SPEED = 30;

export class Statement {
    public pos: number;
    constructor(
        public player: Player,
    ) {
        this.player = player;
        this.pos = 0;
    }

    change() {
        return;
    }
}

export class StatementStandRight extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.standing_right;
    }
    change() {
        this.player.speedX = 0;
    }
}

export class StatementStandLeft extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.standing_left;
    }
    change() {
        this.player.speedX = 0;
    }
}

export class StatementRunRight extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.running_right;
    }
    change() {
        this.player.speedX = RUNNING_SPEED;
    }
}

export class StatementRunLeft extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.running_left;
    }
    change() {
        this.player.speedX = -RUNNING_SPEED;
    }
}

export class StatementJumpRight extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.jumping_right;
    }
}

export class StatementJumpLeft extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.jumping_left;
    }
}

export class StatementFallRight extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.falling_right;
    }
}

export class StatementFallLeft extends Statement {
    constructor(player: Player) {
        super(player);
        this.pos = StatementMap.falling_left;
    }
}

export type StatemCollect = StatementStandRight | StatementStandLeft | StatementRunRight
    | StatementRunLeft | StatementJumpRight | StatementJumpLeft | StatementFallRight | StatementFallLeft;
