import React, {useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {Player} from './Components/Player';
import {StatementMap} from './Components/Statement';

const SideScrollerGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const handleCanvasKeyUp = (player: Player) => function (this: Window, e: KeyboardEvent) {
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

    const handleCanvasKeyDown = (player: Player) => function (this: Window, e: KeyboardEvent) {
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

    const animation = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.update();
        player.draw();
        requestAnimationFrame(() => animation(canvas, ctx, player));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        setCanvasSize(canvasRef, 600, 600);
        const player = new Player(canvas, ctx);
        window.addEventListener<'keyup'>('keyup', handleCanvasKeyUp(player));
        window.addEventListener<'keydown'>('keydown', handleCanvasKeyDown(player));
        animation(canvas, ctx, player);
    }, []);

    return (
        <CommonWrapper>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default SideScrollerGame;
