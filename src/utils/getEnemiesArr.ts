import {Enemy, Enemy4, Enemy2, Enemy3} from '@/common/Constant';
import {EnemyOptions} from '@/common/Interface';

export const getEnemiesArr = (num: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, options: EnemyOptions, Contructor: typeof Enemy) => {
    return Array.from({length: num}).map(() => {
        switch (Contructor) {
            case Enemy2:
                return new Contructor(canvas, ctx, {
                    ...options,
                    moveSpeed: Math.random() * 6,
                    angleSpeed: Math.random() * 0.2,
                    curve: Math.random() * 7,
                });
            case Enemy3:
                return new Contructor(canvas, ctx, {
                    ...options,
                    angleSpeed: Math.random() * 2 + 0.2,
                    curve: Math.random() * 200 + 30,
                });
            case Enemy4:
                return new Contructor(canvas, ctx, {
                    ...options,
                });
            default:
                return new Contructor(canvas, ctx, {
                    ...options,
                    moveSpeed: Math.random() * 6,
                });
        }
    });
};