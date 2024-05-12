import React, {useEffect, useState, useContext, useRef} from 'react';

const DemoContext = React.createContext();

const cur = Date.now();

function useCountDown(target){
    const [value, setValue] = useState(cur);
    const {handleTimer} = useContext(DemoContext);

    const fnRef = React.useRef(null);
    fnRef.current = () => {
        setValue((val) => {
            return val + 1000;
        });
    };
    const removeRef = useRef(null);
    useEffect(() => {
        const {remove} = handleTimer(fnRef);
        removeRef.current = remove;
    }, []);

    useEffect(() => {
        if (value === target && removeRef.current) {
            removeRef.current(fnRef);
        }
    }, [value]);
    return (target - value) / 1000;
}


function Guoqing(){
    const left = useCountDown(cur + 5000);
    return <div>距离国庆放假还有 {left} 秒</div>;
}

function Wuyi(){
    const left = useCountDown(cur + 8000);
    return <div>距离五一放假还有 {left} 秒</div>;
}


function Demo() {
    const timerRef = React.useRef(null);
    const taskSet = React.useRef(new Set());
    const remove = (ref) => {
        taskSet.current.delete(ref);
        if (taskSet.current.size === 0) {
            clearInterval(timerRef.current);
        }
    };
    const handleTimer = (ref) => {
        if (!taskSet.current.has(ref)) {
            taskSet.current.add(ref);
        }
        if (timerRef.current) {
            return {remove};
        }
        timerRef.current = setInterval(() => {
            taskSet.current.forEach(fnRef => {
                fnRef.current();
            });
        }, 1000);
        return {remove};
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <DemoContext.Provider
            value={{handleTimer}}
        >
            <Guoqing />
            <Wuyi />
        </DemoContext.Provider>
    );
}

export default Demo;