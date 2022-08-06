export interface ActionTypeOptsProps {
    name: string;
    frameNums: number;
}

export const ActionTypeOpts: ActionTypeOptsProps[] = [
    {
        name: 'normal',
        frameNums: 7,
    },
    {
        name: 'jump',
        frameNums: 7,
    },
    {
        name: 'fall',
        frameNums: 7,
    },
    {
        name: 'run',
        frameNums: 9,
    },
    {
        name: 'dizzy',
        frameNums: 11,
    },
    {
        name: 'sit',
        frameNums: 5,
    },
    {
        name: 'roll',
        frameNums: 7,
    },
    {
        name: 'bite',
        frameNums: 7,
    },
    {
        name: 'ko',
        frameNums: 12,
    },
    {
        name: 'get-hit',
        frameNums: 4,
    },
];
