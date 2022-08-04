/**
 * 
 * 将角度转换成弧度
 * 360度 = 2 * PI
 */
export const transAngle2Rad = function (angle: number): number {
    const perRad = (2 * Math.PI) / 360;
    return perRad * angle;
};
