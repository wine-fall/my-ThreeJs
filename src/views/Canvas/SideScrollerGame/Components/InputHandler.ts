import {Player} from './Player';
import {StatementMap} from './Statement';

export class InputHandler {
    constructor(player: Player) {
        window.addEventListener<'keyup'>('keyup', this.handleCanvasKeyUp(player));
        window.addEventListener<'keydown'>('keydown', this.handleCanvasKeyDown(player));
    }

    handleRun(palyer: Player, stateNumber: number) {
        palyer.state = palyer.stateMap.get(stateNumber)!;
    }

    handleJump(palyer: Player) {
        const pos = palyer.state.pos;
        if (pos === StatementMap.running_left || pos === StatementMap.standing_left) {
            palyer.state = palyer.stateMap.get(StatementMap.jumping_left)!;
        } else if (pos === StatementMap.running_right || pos === StatementMap.standing_right) {
            palyer.state = palyer.stateMap.get(StatementMap.jumping_right)!;
        }
    }

    handleStand(palyer: Player) {
        const pos = palyer.state.pos;
        if (pos === StatementMap.running_left) {
            palyer.state = palyer.stateMap.get(StatementMap.standing_left)!;
        } else if (pos === StatementMap.running_right) {
            palyer.state = palyer.stateMap.get(StatementMap.standing_right)!;
        }
    }

    handleFall(palyer: Player) {
        const pos = palyer.state.pos;
        if (pos === StatementMap.jumping_left) {
            palyer.state = palyer.stateMap.get(StatementMap.falling_left)!;
        } else if (pos === StatementMap.jumping_right) {
            palyer.state = palyer.stateMap.get(StatementMap.falling_right)!;
        }
    }

    handleCanvasKeyDown = (player: Player) => (e: KeyboardEvent) => {
        const code = e.code;
        switch (code) {
            case 'KeyA':
                this.handleRun(player, StatementMap.running_left);
                break; 
            case 'KeyS':
                break; 
            case 'KeyD':
                this.handleRun(player, StatementMap.running_right);
                break; 
            case 'KeyW':
                this.handleJump(player);
                break;        
            default:
                break;
        }
        player.state.change();
    };

    handleCanvasKeyUp = (player: Player) => (e: KeyboardEvent) => {
        const code = e.code;
        switch (code) {
            case 'KeyA':
                this.handleStand(player);
                break; 
            case 'KeyS':
                break; 
            case 'KeyD':
                this.handleStand(player);
                break; 
            case 'KeyW':
                this.handleFall(player);
                break;        
            default:
                break;
        }
        player.state.change();
    };

}