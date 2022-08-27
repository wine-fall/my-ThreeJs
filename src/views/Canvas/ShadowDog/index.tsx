import React, {ChangeEventHandler, useEffect, useRef, useState} from 'react';
import {CommonWrapper} from '@/components';
import {ActionTypeOpts, ShadowDogClass, shadowDogOptions} from '@/common/Constant';
import {setCanvasSize} from '@/utils';
import {ShadowActionType} from '@/common/Interface';

const ShadowDog: React.FC = () => {
    const [shadowDog, setShadowDog] = useState<ShadowDogClass | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animation = (ctx: CanvasRenderingContext2D, shadowDog: ShadowDogClass) => {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        shadowDog.update();
        shadowDog.draw();
        requestAnimationFrame(() => animation(ctx, shadowDog));
    };

    const handleSelcetChange = (shadowDog: ShadowDogClass): ChangeEventHandler<HTMLSelectElement> => (e) => {
        const name = e.target.value as ShadowActionType;
        shadowDog.changeType(name);
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
        const shadowDog = new ShadowDogClass(canvas, ctx, shadowDogOptions);
        setShadowDog(shadowDog);
        animation(ctx, shadowDog);
    }, []);

    return (
        <CommonWrapper>
            change the select to see different action
            <select onChange={handleSelcetChange(shadowDog!)}>
                {ActionTypeOpts.map(type => {
                    return <option key={type} value={type}>{type}</option>;
                })}
            </select>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default ShadowDog;
