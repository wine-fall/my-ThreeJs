import React, {useEffect, useRef, useState} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';
import {ShadowDogClass, shadowDogOptions} from '@/common/Constant';

const SideScrollerGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleCanvasKeyDown = (shadowDog: ShadowDogClass) => function (this: Window, e: KeyboardEvent) {
        /**
         * since the canvas element can not be focused,
         * you can not bound the keydown listener on canvas.
         * though you can set the "tabindex" property of canvas to {-1}
         * to make it can be focused which is not proper for me.
         */
        const code = e.code;
        switch (code) {
            case 'KeyA':
                break; 
            case 'KeyS':
                break; 
            case 'KeyD':
                break; 
            case 'KeyW':
                shadowDog.changeType('updateJump');
                shadowDog.jumping = true;
                break;        
            default:
                break;
        }
        console.log(e);
    };

    const animation = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, shadowDog: ShadowDogClass) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shadowDog.update();
        shadowDog.draw();
        requestAnimationFrame(() => animation(canvas, ctx, shadowDog));
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
        const shadowDog = new ShadowDogClass(canvas, ctx, {
            ...shadowDogOptions,
            y: canvas.height * (3 / 4),
            ratio: 0.2
        });
        window.addEventListener<'keyup'>('keyup', handleCanvasKeyDown(shadowDog));
        animation(canvas, ctx, shadowDog);
    }, []);

    return (
        <CommonWrapper>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default SideScrollerGame;
