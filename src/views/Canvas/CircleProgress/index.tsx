import React, {useEffect, useRef, useState} from 'react';
import {ArcParamsInter} from '@/common/Interface';
import {transAngle2Rad} from '@/utils';
import {CommonWrapper} from '@/components';

import styles from './index.module.less';

const CircleProgress: React.FC = () => {
    const [context2d, setContext2d] = useState<CanvasRenderingContext2D | null>(null);
    const [arcParams, setArcParams] = useState<ArcParamsInter | null>(null);
    const [counterclockwise, setCounterclockwise] = useState<boolean>(false);
    const [requestId, setRequestId] = useState<number | null>(null);
    const [isAutoDraw, setIsAutoDraw] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getDefaultArcParams = (canvas: HTMLCanvasElement) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 70;
        return {
            x: centerX,
            y: centerY,
            radius,
            startAngle: 0,
            endAngle: 0,
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        canvas.width = 400;
        canvas.height = 400;
        const params = getDefaultArcParams(canvas);
        const context = canvas.getContext('2d')!;
        setContext2d(context);
        setArcParams(params);
    }, [canvasRef]);


    /**
     * 两个 angle，分别为 startAngle，endAngle
     * 如果『下一次』走完了圆圈，也就是 则在『下一次』更新中，应该切换 angle 更新（通过 toggle counterclockwise 来实现）
     */
    const handleDrawNext = () => {
        const canvas = canvasRef.current;
        if (!arcParams || !context2d || !canvas) {
            return;
        }
        const {startAngle, endAngle} = arcParams;
        const changeAngle = counterclockwise ? startAngle : endAngle;
        const randomAngle = transAngle2Rad(Math.floor(Math.random() * 30));
        const nxtAngle = Math.min(changeAngle + randomAngle, 2 * Math.PI);
        if (nxtAngle === 2 * Math.PI) {
            setCounterclockwise(!counterclockwise);
        }
        const nxtStarAngle = counterclockwise ? nxtAngle : startAngle;
        const nxtEndAngle = !counterclockwise ? nxtAngle : endAngle;
        if (nxtStarAngle === 2 * Math.PI && nxtEndAngle === 2 * Math.PI) {
            setArcParams({
                ...arcParams,
                startAngle: 0,
                endAngle: 0
            });
            return;
        }
        setArcParams({
            ...arcParams,
            startAngle: nxtStarAngle,
            endAngle: nxtEndAngle
        });
    };

    const updateCircle = ({x, y, radius, startAngle, endAngle}: ArcParamsInter) => {
        const canvas = canvasRef.current;
        if (!arcParams || !context2d || !canvas) {
            return;
        }
        context2d.clearRect(0, 0, canvas.width, canvas.height);
        context2d.beginPath();
        context2d.arc(x, y, radius, startAngle, endAngle, false);
        context2d.lineWidth = 5;
        context2d.strokeStyle = '#00000040';
        context2d.stroke();
    };

    useEffect(() => {
        if (!arcParams) {
            return;
        }
        updateCircle(arcParams);
        if (!isAutoDraw || arcParams.endAngle === 2 * Math.PI) {
            return;
        }
        if (requestId) {
            cancelAnimationFrame(requestId);
        }
        const newRequestId = requestAnimationFrame(handleDrawNext);
        setRequestId(newRequestId);
    }, [arcParams]);

    const handleAutoDraw = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        resetCircle(canvas);
        setIsAutoDraw(true);
        // const requestId = requestAnimationFrame(handleDrawNext);
        // setRequestId(requestId);
        return;
    };

    const handleClick = () => {
        setIsAutoDraw(false);
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        if (requestId !== null) {
            cancelAnimationFrame(requestId);
            setRequestId(null);
            resetCircle(canvas);
            return;
        }
        handleDrawNext();
    };

    const resetCircle = (canvas: HTMLCanvasElement) => {
        context2d!.clearRect(0, 0, canvas.width, canvas.height);
        setArcParams(getDefaultArcParams(canvas));
        setCounterclockwise(false);
    };

    return (
        <CommonWrapper>
            <canvas ref={canvasRef} width="400"
                height="400"></canvas>
            <div>
                <button className={styles.circleBtn} onClick={handleClick}>click me draw the circle</button>
                <button className={styles.circleBtn} onClick={handleAutoDraw}>auto draw the circle</button>
            </div>
        </CommonWrapper>
    );
};

export default CircleProgress;
