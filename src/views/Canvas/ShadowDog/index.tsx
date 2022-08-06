import React, {ChangeEventHandler, useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import shadowDogPic from '@/assets/img/shadow_dog.png';
import {ActionTypeOpts} from './constant';

const ShadowDog: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const img = new Image();
    img.src = shadowDogPic;
    const spriteWidth = 575;
    const spriteHeight = 523;

    const FrameParmas = {
        frameX: 0,
        frameY: 0,
        frameNums: 7,
        separator: 5,
        frames: 0,
    };
    const animation = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const W = canvas.width;
        const H = canvas.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const {frameNums, frameX, frameY, frames, separator} = FrameParmas;
        if (frames % separator === 0) {
            const nxtFrameX = (frameX + 1) % frameNums;
            FrameParmas.frameX = nxtFrameX;
            ctx.clearRect(0, 0, W, H);
            ctx.drawImage(img,
                frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight,
                0, 0, spriteWidth, spriteHeight);
        }
        FrameParmas.frames++;
        requestAnimationFrame(animation);
    };

    const handleSelcetChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const name = e.target.value;
        const idx = ActionTypeOpts.findIndex(item => item.name === name);
        const target = ActionTypeOpts.find(item => item.name === name);
        FrameParmas.frameY = idx;
        FrameParmas.frameNums = target?.frameNums || 0;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        canvas.width = 600;
        canvas.height = 600;
        animation();
    }, []);

    return (
        <CommonWrapper>
            <select onChange={handleSelcetChange}>
                {ActionTypeOpts.map((opt) => {
                    return <option key={opt.name} value={opt.name}>{opt.name}</option>;
                })}
            </select>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default ShadowDog;
