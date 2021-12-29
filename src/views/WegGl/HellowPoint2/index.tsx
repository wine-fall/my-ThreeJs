import React, {useEffect, useRef} from 'react';
import {getWebGLContext, initShaders} from '@/assets/js/cuon-utils';

const HellowPoint2: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 顶点着色
    const VSHADER_SOURCE
        = 'attribute vec4 a_Position;\n'
        + 'attribute float a_PointSize; \n'
        + 'void main() {\n'
        + '   gl_Position = a_Position; \n' // 设置坐标
        + '   gl_PointSize = a_PointSize; \n' // 设置尺寸
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
        const {program, isinit} = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        if (!isinit) {
            return;
        }
        if (!program) {
            return;
        }
        const a_Position = gl.getAttribLocation(program, 'a_Position');
        const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
        if (a_Position < 0 || a_PointSize < 0) {
            return;
        }
        gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
        gl.vertexAttrib1f(a_PointSize, 12.0);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    }, []);

    return <canvas ref={canvasRef} id='drawRectangle'></canvas>;
};

export default HellowPoint2;
