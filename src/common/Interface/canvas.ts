export interface ArcParamsInter {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    counterclockwise?: boolean
}

export interface EnemyOptions {
    spriteWidth: number;
    spriteHeight: number;
    imgPath: string;
    frames: number;
    separator: number;
    ratio: number;
    moveSpeed?: number;
    curve?: number;
    angleSpeed?: number;
}

export interface EnemyParams extends Omit<EnemyOptions, 'imgPath'> {
    image: HTMLImageElement;
}

export interface ActionTypeOptsProps {
    name: string;
    frameNums: number;
}

export interface ExplosionOptions extends EnemyOptions {
    x: number;
    y: number;
}

export interface ExplosionParams extends Omit<ExplosionOptions, 'imgPath'> {
    image: HTMLImageElement;
}
