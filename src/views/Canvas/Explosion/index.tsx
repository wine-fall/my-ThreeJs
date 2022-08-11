import React, {MouseEvent, MouseEventHandler, useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {Explosion} from '@/common/Constant';
import boomPic from '@/assets/img/boom.png';

// import './index.module.less';

const Collision: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const explosionSet = new Set<Explosion>();

    const animation = () => {
        for (const [key, value] of explosionSet.values) {

        }
        explosion.update();
        explosion.draw();
        requestAnimationFrame(() => animation(explosion));
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
    }, []);

    const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = (e) => {
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
            separator: 7,
            spriteWidth: 200,
            spriteHeight: 179,
            imgPath: boomPic,
            frames: 5,
            ratio: 2,
            x,
            y
        });
        explosionSet.add(explosion);
        animation();
    };

    return (
        <CommonWrapper>
            <canvas onClick={handleCanvasClick} ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default Collision;
