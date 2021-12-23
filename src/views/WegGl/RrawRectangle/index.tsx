import React, {useEffect, useRef} from 'react';

const RrawRectangle: React.FC = () => {
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
        ctx.fillStyle = 'rgba(0,0,255,1)';
        ctx.fillRect(120, 10, 150, 150);
    }, []);

    return <canvas ref={canvasRef} id='drawRectangle'></canvas>;
};

export default RrawRectangle;