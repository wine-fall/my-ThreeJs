import React, {useRef, useEffect, useState} from 'react';
import {getWebGLContext, initShaders} from '@/assets/js/cuon-utils';


type PointsItem = {
    x: number,
    y: number
}

type ColorItem = {
    r: number,
    g: number,
    b: number,
    a: number
}

const ColoredPoints: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [globalGl, setGlobalGl] = useState<WebGLRenderingContext | null>(null);
    const [g_Points, setG_Points] = useState<PointsItem []>([]);
    const [a_Position, setA_Position] = useState<number>(-1);
    const [a_PointSize, setA_PointSize] = useState<number>(-1);
    const [u_FragColor, setU_FragColor] = useState<WebGLUniformLocation | null>(null);
    const [g_Colors, setG_Colors] = useState<ColorItem[]>([]);
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
        = 'precision mediump float;\n'
        + 'uniform vec4 u_FragColor; \n'
        + 'void main() {\n'
        + '   gl_FragColor = u_FragColor; \n' // 设置颜色
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
        setU_FragColor(gl.getUniformLocation(program, 'u_FragColor'));
    }, []);

    useEffect(() => {
        if (!globalGl) {
            return;
        }
        globalGl.clearColor(0, 0, 0, 1);
        globalGl.clear(globalGl.COLOR_BUFFER_BIT);
    }, [globalGl]);

    useEffect(() => {
        if (!globalGl) {
            return;
        }
        globalGl.clear(globalGl.COLOR_BUFFER_BIT);
        for (let i = 0; i < g_Points.length; i++) {
            const {x, y} = g_Points[i];
            const {r, g, b, a} = g_Colors[i];
            globalGl.vertexAttrib3f(a_Position, x, y, 0.0);
            globalGl.vertexAttrib1f(a_PointSize, 5.0);
            globalGl.uniform4f(u_FragColor, r, g, b, a);
            globalGl.drawArrays(globalGl.POINTS, 0, 1);
        }
    }, [g_Points, globalGl, g_Colors]);

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        handleClick(e);
    };

    const handleClick = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || !globalGl) {
            return;
        }
        let x = e.clientX;
        let y = e.clientY;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2); // webgl 的坐标范围是 -1 ~ 1
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
        setG_Points(g_Points.concat({x, y}));
        if (x < 0 && y < 0) {
            setG_Colors(g_Colors.concat({
                r: 1.0,
                g: 0.0,
                b: 0.0,
                a: 1.0
            }));
        } else if (x >= 0 && y >= 0) {
            setG_Colors(g_Colors.concat({
                r: 0.0,
                g: 1.0,
                b: 0.0,
                a: 1.0
            }));
        } else if (x < 0 && y >= 0) {
            setG_Colors(g_Colors.concat({
                r: 0.0,
                g: 0.0,
                b: 1.0,
                a: 1.0
            }));
        } else {
            setG_Colors(g_Colors.concat({
                r: 1.0,
                g: 1.0,
                b: 1.0,
                a: 1.0
            }));
        }
    };

    return <canvas ref={canvasRef} onMouseDown={handleCanvasMouseDown}></canvas>;
};

export default ColoredPoints;