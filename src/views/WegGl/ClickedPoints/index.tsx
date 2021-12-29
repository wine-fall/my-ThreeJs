import {getWebGLContext, initShaders} from '@/assets/js/cuon-utils';
import React, {useRef, useEffect, MouseEventHandler, useState} from 'react';

const ClickedPoints: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [globalGl, setGlobalGl] = useState<WebGLRenderingContext | null>(null);
    const [g_Points, setG_Points] = useState<number []>([]);
    const [a_Position, setA_Position] = useState<number>(-1);
    const [a_PointSize, setA_PointSize] = useState<number>(-1);

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
        + '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' // 设置颜色
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
        setA_PointSize(gl.getAttribLocation(program, 'a_PointSize'));
    }, []);

    useEffect(() => {
        if (a_Position < 0 || a_PointSize < 0 || !globalGl) {
            return;
        }
        globalGl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
        globalGl.vertexAttrib1f(a_PointSize, 5.0);
        globalGl.clearColor(0, 0, 0, 1);
        globalGl.clear(globalGl.COLOR_BUFFER_BIT);
        globalGl.drawArrays(globalGl.POINTS, 0, 1);
    }, [a_Position, a_PointSize, globalGl]);

    const handleCanvasMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
        handleClick(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current;
        if (!canvas || !globalGl) {
            return;
        }
        let x = e.clientX;
        let y = e.clientY;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2); // webgl 的坐标范围是 -1 ~ 1
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
        setG_Points([...g_Points, x, y]);

    };

    useEffect(() => {
        if (!globalGl) {
            return;
        }
        globalGl.clear(globalGl.COLOR_BUFFER_BIT);
        for (let i = 0; i < g_Points.length; i += 2) {
            const x = g_Points[i];
            const y = g_Points[i + 1];
            globalGl.vertexAttrib3f(a_Position, x, y, 0.0);
            globalGl.drawArrays(globalGl.POINTS, 0, 1);
        }

    }, [g_Points, globalGl]);

    return <canvas ref={canvasRef} onMouseDown={handleCanvasMouseDown}></canvas>;
};

export default ClickedPoints;