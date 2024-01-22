import {Player} from './Player';
import {StatementMap} from './Statement';

export class InputHandler {
    constructor(player: Player) {
        window.addEventListener<'keyup'>('keyup', this.handleCanvasKeyUp(player));
        window.addEventListener<'keydown'>('keydown', this.handleCanvasKeyDown(player));
    }

    handleCanvasKeyUp = (player: Player) => function (this: Window, e: KeyboardEvent) {
        const code = e.code;
        switch (code) {
            case 'KeyA':
                player.changeState(StatementMap.standing_left);
                break; 
            case 'KeyS':
                break; 
            case 'KeyD':
                player.changeState(StatementMap.standing_right);
                break; 
            case 'KeyW':
                break;        
            default:
                break;
        }
    };

    handleCanvasKeyDown = (player: Player) => function (this: Window, e: KeyboardEvent) {
        const code = e.code;
        switch (code) {
            case 'KeyA':
                player.changeState(StatementMap.running_left);
                break; 
            case 'KeyS':
                break; 
            case 'KeyD':
                player.changeState(StatementMap.running_right);
                break; 
            case 'KeyW':
                break;        
            default:
                break;
        }
    };
}