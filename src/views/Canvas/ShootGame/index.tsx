import React, {MouseEventHandler, useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {Raven, RavenBaseOptions, Explosion, ExplosionBaseOptions, Particle} from '@/common/Constant';
import styles from './index.module.less';
import {CreateParticleFn, ShootGameAnimationFn} from '@/common/Interface';

const ShootGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasWrapperRef = useRef<HTMLCanvasElement>(null);

    let lastTime = new Date().valueOf();
    const interval = 500;
    let time2CreateRaven = 0;
    let score = 0;
    let lostCnt = 0;
    const MAX_LOST_CNT = 5;
    const NUM_OF_PARTICLE_PER_TIME = 5;
    const ravenMap = new Map<string, Raven>();
    const explosionSet = new Set<Explosion>();
    const particleSet = new Set<Particle>();

    const animation: ShootGameAnimationFn = (ctx, canvas, ctxWrapper) => {
        const curTime = new Date().valueOf();
        const deltaTime = curTime - lastTime;
        lastTime = curTime;
        time2CreateRaven += deltaTime;
        if (time2CreateRaven > interval) {
            addRaven(ctx, canvas, ctxWrapper);
        }
        updateInstance(ctx, canvas, ctxWrapper);
        if (lostCnt > MAX_LOST_CNT) {
            drawGameOver(ctx, canvas);
            return;
        }
        requestAnimationFrame(() => animation(ctx, canvas, ctxWrapper));
    };

    const updateInstance: ShootGameAnimationFn = (ctx, canvas, ctxWrapper) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxWrapper.clearRect(0, 0, canvas.width, canvas.height);
        for (const [, particle] of particleSet.entries()) {
            particle.update();
            particle.draw();
            if (particle.radius > particle.maxRadius - 5) {
                particleSet.delete(particle);
            }
        }
        for (const [, explosion] of explosionSet.entries()) {
            explosion.update();
            explosion.draw();
            if (explosion.frameX > 5) {
                explosionSet.delete(explosion);
            }
        }
        for (const [color, raven] of ravenMap.entries()) {
            raven.draw();
            raven.update(createParticle);
            if (raven.x < 0 - raven.options.spriteWidth * raven.options.ratio) {
                ravenMap.delete(color);
                lostCnt++;
            }
        }
        drawScore(ctx);
    };
    const addRaven: ShootGameAnimationFn = (ctx, canvas, ctxWrapper) => {
        const raven = new Raven(canvas, ctx, {...RavenBaseOptions, ratio: Math.random() + 0.3}, ctxWrapper);
        time2CreateRaven = 0;
        ravenMap.set(raven.color, raven);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWrapper = canvasWrapperRef.current;
        if (!canvas || !canvasWrapper) {
            return;
        }
        const ctx = canvas.getContext('2d');
        const ctxWrapper = canvasWrapper.getContext('2d');
        if (!ctx || !ctxWrapper) {
            return;
        }
        setCanvasSize(canvasRef, 600, 600);
        setCanvasSize(canvasWrapperRef, 600, 600);
        const raven = new Raven(canvas, ctx, RavenBaseOptions, ctxWrapper);
        ravenMap.set(raven.color, raven);
        animation(ctx, canvas, ctxWrapper);
    }, []);

    const createParticle: CreateParticleFn = (ctx, x, y, radius, color) => {
        for (let i = 0; i < NUM_OF_PARTICLE_PER_TIME; i++) {
            particleSet.add(new Particle(ctx, x, y, radius, color));
        }
    };

    const drawScore = (ctx: CanvasRenderingContext2D) => {
        ctx.font = '50px Impact';
        ctx.fillStyle = '#000';
        ctx.fillText(`Score: ${score}`, 50, 80);
    };

    const drawGameOver = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.save();
        ctx.font = '30px Impact';
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.fillText(`you have let ${MAX_LOST_CNT} ravens escaped`, canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText(`Game is over and your score is: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    };

    const handleClickCanvas: MouseEventHandler<HTMLCanvasElement> = (e) => {
        const canvas = canvasRef.current;
        const canvasWrapper = canvasWrapperRef.current;
        if (!canvas || !canvasWrapper) {
            return;
        }
        const ctx = canvas.getContext('2d');
        const ctxWrapper = canvasWrapper.getContext('2d');
        if (!ctx || !ctxWrapper) {
            return;
        }
        const left = canvasWrapper.getBoundingClientRect().left;
        const top = canvasWrapper.getBoundingClientRect().top;
        const x = e.clientX - left;
        const y = e.clientY - top;
        const imageData = ctxWrapper.getImageData(x, y, 1, 1);
        const [r, g, b] = imageData.data;
        const color = `rgb(${r}, ${g}, ${b})`;
        if (!ravenMap.has(color)) {
            console.log(color);
        }
        if (ravenMap.has(color)) {
            const raven = ravenMap.get(color);
            const explosion = new Explosion(canvasWrapper!, ctx, {
                ...ExplosionBaseOptions,
                x,
                y,
                ratio: raven!.options.ratio
            });
            explosionSet.add(explosion);
            ravenMap.delete(color);
            score++;
        }
    };

    return (
        <CommonWrapper>
            <canvas className={styles.collisionCanvas}
                ref={canvasWrapperRef}></canvas>
            <canvas onClick={handleClickCanvas} className={styles.canvas}
                ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default ShootGame;
