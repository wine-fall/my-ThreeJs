export const WordList = ['tidal'];

export const createInitPanel = (rowNumber, colNumber) => {
    return Array(rowNumber)
        .fill(0)
        .map(() => Array(colNumber).fill(''));
};

export const getRowColByPos = (charPos, colNumber) => {
    return {
        row: Math.floor(charPos / colNumber),
        col: charPos % colNumber,
    };
};

export const checkNewBeginRow = (charPos, colNumber) =>
    charPos % colNumber === 0;
