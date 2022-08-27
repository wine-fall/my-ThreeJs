import React, {useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';

const SideScrollerGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleCanvasKeyDown: EventListenerOrEventListenerObject = (e) => {
        /**
         * since the canvas element can not be focused,
         * you can not bound the keydown listener on canvas.
         * though you can set the "tabindex" property of canvas to {-1}
         * to make it can be focused whichi is not proper for me.
         */
        console.log(e);
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
        window.addEventListener('keydown', handleCanvasKeyDown);
    });

    return (
        <CommonWrapper>
            <canvas ref={canvasRef} tabIndex={0}></canvas>
        </CommonWrapper>
    );
};

export default SideScrollerGame;
