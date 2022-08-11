import React, {useEffect, useRef} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize} from '@/utils';

const Collision: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        // sw = 200;
        // sh = 179;
        setCanvasSize(canvasRef, 600, 600);
    }, []);
    return (
        <CommonWrapper>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default Collision;
