import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {CommonWrapper} from '@/components';
import {setCanvasSize, getEnemiesArr} from '@/utils';
import {Enemy, enemyParamsMap} from '@/common/Constant/Canvas/constant';

const Enemies: React.FC = () => {
    const [enemyType, setEnemyType] = useState<string>('enemy1');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const numOfEnemies = 10;

    const animation = (ctx: CanvasRenderingContext2D, enemies: Enemy[]) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        enemies.forEach(enemy => {
            enemy.update();
            enemy.draw();
        });
        requestAnimationFrame(() => animation(ctx, enemies));
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
        const enemyParams = enemyParamsMap[enemyType];
        const enemies = getEnemiesArr(numOfEnemies, canvas, ctx, enemyParams.options, enemyParams.Contructor);
        animation(ctx, enemies);
    }, [enemyType]);

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setEnemyType(e.target.value);
    };

    return (
        <CommonWrapper>
            <select onChange={handleSelectChange}>
                {['enemy1', 'enemy2', 'enemy3', 'enemy4'].map(value => {
                    return <option key={value} value={value}>{value}</option>;
                })}
            </select>
            <canvas ref={canvasRef}></canvas>
        </CommonWrapper>
    );
};

export default Enemies;
