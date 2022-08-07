import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {CommonWrapper} from '@/components';
import {Layer, layerParamsArr} from '@/common/Constant';

import './index.module.less';

const ParallaxBackgrounds: React.FC = () => {
    const [layerArr, setLayerArr] = useState<Layer[]>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animation = (layerArr: Layer[]) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const W = canvas.width;
        const H = canvas.height;

        ctx.clearRect(0, 0, W, H);
        layerArr.forEach(layer => {
            layer.update();
            layer.draw();
        });
        requestAnimationFrame(() => animation(layerArr));
    };

    const createLayerArray = (ctx: CanvasRenderingContext2D) => {
        return layerParamsArr.map(item => {
            return new Layer(item.imgPath, item.speedMulti, ctx);
        });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
        console.log('key', e.key);
        return;
    };

    let gameSpeed = 20;

    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('value', +e.target.value);
        gameSpeed = +e.target.value;
        const speedDiv = document.getElementById('speedDivId');
        speedDiv!.innerText = `speed is ${e.target.value}`;
        layerArr?.forEach(layer => {
            layer.updateSpeed(gameSpeed);
        });
    };

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        canvas.width = 800;
        canvas.height = 700;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const layerArr = createLayerArray(ctx);
        setLayerArr(layerArr);
        animation(layerArr);
    };

    return (
        <CommonWrapper>
            <canvas ref={canvasRef} onKeyDown={handleKeyDown}></canvas>
            <div id='speedDivId' style={{
                color: '#fff'
            }}>speed is 20</div>
            <input
                type="range"
                min={0}
                max={20}
                style={{
                    width: '600px'
                }}
                // value={5}
                onChange={handleSliderChange}/>
        </CommonWrapper>
    );
};

export default ParallaxBackgrounds;