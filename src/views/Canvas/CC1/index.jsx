import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
    WordList,
    createInitPanel,
    getRowColByPos,
    checkNewBeginRow,
    CharStatus,
    keyBoards,
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

const WordleCell = ({idx, val, status}) => {

    const className = useMemo(() => {
        if (status === CharStatus.unreach) {
            return 'wordleCell';
        } else if (status === CharStatus.correctChar) {
            return 'wordleCell correctChar';
        } else if (status === CharStatus.correctCharAndPos) {
            return 'wordleCell correctCharAndPos';
        } else {
            return 'wordleCell error';
        }
    }, [status]);

    return (
        <div
            style={{
                transitionDuration: `${(idx + 1) * 400}ms`,
            }}
            className={className}
        >
            {val}
        </div>
    );
};

const KeyBoardRow = ({row, idx, onCharInput, onCharEnter, onCharDelete}) => {

    const handleCharClick = (key, cb) => {
        return () => cb({key});
    };

    const createKeyBoardCells = () => {
        const charCells = row.map((char) => (
            <div key={char} className={'keyBoardCell'}
                onClick={handleCharClick(char.toLowerCase(), onCharInput)}>{char}</div>
        ));
        if (idx === 0) {
            return charCells;
        } else if (idx === 1) {
            return (
                <>
                    <div className='cellSpace'></div>
                    {charCells}
                    <div className='cellSpace'></div>
                </>
            );
        } else {
            return (
                <>
                    <div className='cellOpt' onClick={handleCharClick('Enter', onCharEnter)}>Enter</div>
                    {charCells}
                    <div className='cellOpt' onClick={handleCharClick('BackSpace', onCharDelete)}>BackSpace</div>
                </>
            );
        }
    };
    return (
        <div className={'keyBoardRow'}>
            {createKeyBoardCells()}
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

    const handleReset = () => {
        setCharPos(0);
        setEnter(true);
        setCharsPanel(createInitPanel(rowNumber, colNumber));
    };

    const updateParams = (row, col, char, charDiff) => {
        if (row === -1 || col === -1) {
            return;
        }
        charsPanel[row][col][0] = char;
        const nxtCharPos = Math.min(
            Math.max(charPos + charDiff, 0),
            rowNumber * colNumber
        ); // a valid pos should in range [0, rowNumber * colNumber]
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
        const checkRow = charsPanel[row];
        const map = new Map();
        for (let i = 0; i < answer.length; i++) {
            map.set(answer[i], (map.get(answer[i]) || 0) + 1);
        }
        for (let i = 0; i < colNumber; i++) {
            const char = checkRow[i][0];
            if (char === answer[i]) {
                checkRow[i][1] = CharStatus.correctCharAndPos;
                map.set(char, map.get(char) - 1);
            } else if (map.has(char)) {
                checkRow[i][1] = CharStatus.correctChar;
                map.set(char, map.get(char) - 1);
            } else {
                checkRow[i][1] = CharStatus.error;
            }
            if (map.has(char) && map.get(char) === 0) {
                map.delete(char);
            }
        }
        // todo: chech if is a valid word
        console.log('The input is', checkRow.map(([v]) => v).join(''));
        checkedSetRef.current.add(row);
        setCharsPanel([...charsPanel]);
        setEnter(true);
    };

    useEffect(() => {
        const {row} = getRowColByPos(charPos - 1, colNumber);
        if (!enter || row < 0) {
            return;
        }
        const checkRow = charsPanel[row];
        if (checkRow.map(([v]) => v).join('') === answer) {
            alert('You are right!');
            handleReset();
        }
    }, [enter]);

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
        return charsPanel[row]
            .map(([val, status], idx) => {
                return (
                    <WordleCell
                        key={idx}
                        idx={idx}
                        val={val}
                        status={status}
                    />
                );
            });
    };

    const createRows = () => {
        return charsPanel
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
            <div className={'keyBoard'}>
                {keyBoards.map((row, idx) => (
                    <KeyBoardRow
                        key={idx}
                        idx={idx}
                        row={row}
                        onCharInput={handleInput}
                        onCharEnter={handleCheck}
                        onCharDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
