import React, {useEffect, useRef, useState} from 'react';
import {getWebGLContext, initShaders} from '@/assets/js/cuon-utils';

const MultiPoints: React.FC = () => {
    const [globalGl, setGlobalGl] = useState<WebGLRenderingContext | null>(null);
    const [a_Position, setA_Position] = useState<number>(-1);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 顶点着色
    const VSHADER_SOURCE
        = 'attribute vec4 a_Position;\n'
        + 'void main() {\n'
        + '   gl_Position = a_Position; \n' // 设置坐标
        + '   gl_PointSize = 5.0;\n' // 设置尺寸
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
        setGlobalGl(gl);
        const {program, isinit} = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        if (!isinit) {
            return;
        }
        if (!program) {
            return;
        }
        setA_Position(gl.getAttribLocation(program, 'a_Position'));
        
    }, []);

    useEffect(() => {
        if (a_Position < 0 || !globalGl) {
            return;
        }
        globalGl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
        

        const n = initVertexBuffers(globalGl);

        globalGl.clearColor(0, 0, 0, 1);
        globalGl.clear(globalGl.COLOR_BUFFER_BIT);

        if (n < 0) {
            console.log('failed to set the position of the vertices');
            return;
        }

        globalGl.drawArrays(globalGl.POINTS, 0, n);
    }, [globalGl, a_Position]);

    const initVertexBuffers = (gl: WebGLRenderingContext) => {
        const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
        const n = 3; // 点的个数
        const vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            return -1;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        return n;
    };

    return <canvas ref={canvasRef} id='drawRectangle'></canvas>;
};

export default MultiPoints;
