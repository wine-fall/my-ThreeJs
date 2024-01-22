import React, {useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {Player} from './Components/Player';
import {InputHandler} from './Components/InputHandler';

const SideScrollerGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
        new InputHandler(player);
        animation(canvas, ctx, player);
    }, []);

    return (
        <CommonWrapper>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default SideScrollerGame;
