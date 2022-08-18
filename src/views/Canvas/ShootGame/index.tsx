import React, {useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {Raven, RavenBaseOptions} from '@/common/Constant';

const ShootGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animation = (raven: Raven, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raven.draw();
        raven.update();
        requestAnimationFrame(() => animation(raven, ctx, canvas));
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
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setCanvasSize(canvasRef, 600, 600);
        const raven = new Raven(canvas, ctx, {
            ...RavenBaseOptions,
        });
        animation(raven, ctx, canvas);
    }, []);
    return (
        <CommonWrapper>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default ShootGame;
