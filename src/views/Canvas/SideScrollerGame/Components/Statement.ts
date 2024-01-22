import {Player} from './Player';

export const StatementMap = {
    standing_right: 0,
    standing_left: 1,
    running_right: 6,
    running_left: 7
};

const RUNNING_SPEED = 30;

export class Statement {
    constructor(
        public yPos: number,
        public player: Player
    ) {
        this.yPos = yPos;
        this.player = player;
    }

    change() {
        return;
    }
}

export class StatementStandRight extends Statement {
    private pos: number;
    constructor(player: Player) {
        super(StatementMap.standing_right, player);
        this.pos = StatementMap.standing_right;
    }
    change() {
        this.player.speedX = 0;
    }
}

export class StatementStandLeft extends Statement {
    private pos: number;
    constructor(player: Player) {
        super(StatementMap.standing_left, player);
        this.pos = StatementMap.standing_left;
    }
    change() {
        this.player.speedX = 0;
    }
}

export class StatementRunRight extends Statement {
    private pos: number;
    constructor(player: Player) {
        super(StatementMap.running_right, player);
        this.pos = StatementMap.running_right;
    }
    change() {
        this.player.speedX = RUNNING_SPEED;
    }
}

export class StatementRunLeft extends Statement {
    private pos: number;
    constructor(player: Player) {
        super(StatementMap.running_left, player);
        this.pos = StatementMap.running_left;
    }
    change() {
        this.player.speedX = -RUNNING_SPEED;
    }
}

