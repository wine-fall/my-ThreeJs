export interface ArcParamsInter {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    counterclockwise?: boolean
}

export interface BaseOptions {
    spriteWidth: number;
    spriteHeight: number;
    imgPath: string;
    frames: number;
    separator: number;
    ratio: number;
}

export interface EnemyOptions extends BaseOptions {
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

export interface ExplosionOptions extends BaseOptions {
    x: number;
    y: number;
}

export interface ExplosionParams extends Omit<ExplosionOptions, 'imgPath'> {
    image: HTMLImageElement;
}

export interface RavenOptions extends BaseOptions {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
}

export interface RavenParams extends Omit<RavenOptions, 'imgPath'> {
    image: HTMLImageElement;
}
