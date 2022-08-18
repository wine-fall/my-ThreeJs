import React, {MouseEventHandler, useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {Explosion, ExplosionBaseOptions} from '@/common/Constant';

const Collision: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const explosionSet = new Set<Explosion>();

    const animation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const [, explosion] of explosionSet.entries()) {
            explosion.update();
            explosion.draw();
            if (explosion.frameX > 5) {
                explosionSet.delete(explosion);
            }
        }
        requestAnimationFrame(() => animation(ctx, canvas));
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
        animation(ctx, canvas);
    }, []);

    const createExplosion: MouseEventHandler<HTMLCanvasElement> = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const top = canvas!.getBoundingClientRect().top;
        const left = canvas!.getBoundingClientRect().left;
        const x = e.clientX - left;
        const y = e.clientY - top;
        const explosion = new Explosion(canvas!, ctx, {
            ...ExplosionBaseOptions,
            x,
            y
        });
        explosionSet.add(explosion);
    };

    const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = (e) => {
        createExplosion(e);
    };

    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
        createExplosion(e);
    };

    return (
        <CommonWrapper>
            <canvas
                onMouseMove={handleMouseMove}
                onClick={handleCanvasClick}
                ref={canvasRef}
            ></canvas>
        </CommonWrapper>
    );
};

export default Collision;
