export const WordList = ['tidal'];

export const CharStatus = {
    unreach: 0,
    correctChar: 1,
    correctCharAndPos: 2,
    error: 3,
};

export const createInitPanel = (rowNumber, colNumber) => {
    return Array(rowNumber)
        .fill(0)
        .map(() => Array(colNumber).fill(0).map(() => {
            return ['', CharStatus.unreach];
        }));
};

export const getRowColByPos = (charPos, colNumber) => {
    return {
        row: Math.floor(charPos / colNumber),
        col: charPos % colNumber,
    };
};

export const checkNewBeginRow = (charPos, colNumber) =>
    charPos % colNumber === 0;

export const keyBoards = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];
