import React, {useState, useEffect, useRef} from 'react';
import {
    WordList,
    createInitPanel,
    getRowColByPos,
    checkNewBeginRow,
} from './constant';
import './styles.css';

const useEventListner = (target, type, cb) => {
    const ref = useRef(null);
    useEffect(() => {
        ref.current = cb;
    }, [cb]);

    const listner = (e) => {
        ref.current(e);
    };

    useEffect(() => {
        target.addEventListener(type, listner);
        return () => {
            target.removeEventListener(type, listner);
        };
    }, []);
};

const WordleCell = ({idx, val}) => {
    return (
        <div
            style={{
                animationDelay: `${idx * 100}ms`,
            }}
            className={'wordleCell'}
        >
            {val}
        </div>
    );
};

export default function App() {
    const [rowNumber, setRowNumber] = useState(6); // todo: rowNumber maybe dynamic
    const [colNumber, setColNumber] = useState(5); // todo: colNumber maybe dynamic
    const [answer, setAnswer] = useState(WordList[0]);

    const checkedSetRef = useRef(new Set());

    const [charPos, setCharPos] = useState(0);
    const [charsPanel, setCharsPanel] = useState(
        createInitPanel(rowNumber, colNumber)
    );
    const [enter, setEnter] = useState(true);

    const updateParams = (row, col, char, charDiff) => {
        if (row === -1 || col === -1) {
            return;
        }
        charsPanel[row][col] = char;
        const nxtCharPos = Math.min(
            Math.max(charPos + charDiff, 0),
            rowNumber * colNumber
        ); // a valid should in range [0, rowNumber * colNumber]
        setCharPos(nxtCharPos);
        setCharsPanel([...charsPanel]);
        if (checkNewBeginRow(nxtCharPos, colNumber) && char === '') {
            setEnter(true);
        } else {
            setEnter(false);
        }
    };

    const handleInput = (e) => {
        if (
            // we reach the last one
            charPos > rowNumber * colNumber
            // we finish one row but not click enter
            || (checkNewBeginRow(charPos, colNumber) && !enter)
        ) {
            return;
        }
        const val = e.key;
        const {row, col} = getRowColByPos(charPos, colNumber);
        updateParams(row, col, val, 1);
    };

    const handleCheck = () => {
        if (!checkNewBeginRow(charPos, colNumber)) {
            return;
        }
        const {row} = getRowColByPos(charPos - 1, colNumber);
        // todo: chech if is a valid word
        console.log('The input is', charsPanel[row].join(''));
        checkedSetRef.current.add(row);
        setEnter(true);
    };

    const handleDelete = () => {
        const isAtNewRow = checkNewBeginRow(charPos, colNumber);
        const {row, col} = getRowColByPos(charPos - 1, colNumber);
        if (isAtNewRow) {
            // we need to check the last row
            if (checkedSetRef.current.has(row)) {
                // we at a new row and the last row has been checked
                return;
            } else {
                updateParams(row, col, '', -1);
            }
        } else {
            updateParams(row, col, '', -1);
        }
    };

    const handleKeyDown = (e) => {
        if (String(e.key).length === 1 && /^[A-Za-z]+$/.test(e.key)) {
            handleInput(e);
        }
        if (e.key === 'Enter') {
            handleCheck();
        }
        if (e.key === 'Backspace') {
            handleDelete();
        }
    };

    useEventListner(window, 'keydown', handleKeyDown);

    useEffect(() => {
    // todo get randam answer
        setAnswer(WordList[0]);
    }, []);

    const createCells = (row) => {
        return Array(colNumber)
            .fill(0)
            .map((_, idx) => {
                const val = charsPanel[row][idx];
                return (
                    <WordleCell key={idx} idx={idx}
                        val={val} />
                );
            });
    };

    const createRows = () => {
        return Array(rowNumber)
            .fill(0)
            .map((_, idx) => {
                return (
                    <div key={idx} className={'wordleRow'}>
                        {createCells(idx)}
                    </div>
                );
            });
    };

    return (
        <div className="App">
            <h1>React Wordle</h1>
            <h4>by guozhiyi</h4>
            <div className={'worldeBoard'}>{createRows()}</div>
        </div>
    );
}
