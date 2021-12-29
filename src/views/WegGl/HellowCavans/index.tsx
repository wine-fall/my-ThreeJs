import React, {useEffect, useRef} from 'react';
import {getWebGLContext} from '@/assets/js/cuon-utils';

const HellowCavans: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const {gl} = getWebGLContext(canvas);
        
        if (!gl) {
            return;
        }
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }, []);

    return <canvas ref={canvasRef} id='drawRectangle'></canvas>;
};

export default HellowCavans;
