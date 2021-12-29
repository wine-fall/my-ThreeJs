import React, {useEffect, useRef} from 'react';
import {getWebGLContext, initShaders} from '@/assets/js/cuon-utils';

const HellowPoint1: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 顶点着色
    const VSHADER_SOURCE
        = 'void main() {\n'
        + '   gl_Position = vec4(0.0, 0.0, 0.0, 1.0); \n' // 设置坐标
        + '   gl_PointSize = 10.0; \n' // 设置尺寸
        + '}\n';

    // 片元着色
    const FSHADER_SOURCE
        = 'void main() {\n'
        + ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' // 设置颜色
        + '}\n';
    useEffect(() => {
        const canvas = canvasRef.current;
        const {gl} = getWebGLContext(canvas);
        if (!gl) {
            return;
        }
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE).isinit) {
            return;
        }

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    }, []);

    return <canvas ref={canvasRef} id='drawRectangle'></canvas>;
};

export default HellowPoint1;
