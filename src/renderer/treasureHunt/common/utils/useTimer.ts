import { useState, useRef } from 'react';
import { SECOND } from '../constants/Constants';

export const useTimer = (initialTime = 0, interval = 100) => {
    const [time, setTime] = useState(initialTime);
    const intervalRef = useRef<NodeJS.Timeout>(null!);

    const resetTimer = () => {
        stopTimer();
        setTime(initialTime);
    };

    const stopTimer = () => {
        if (!intervalRef.current) return;
        clearInterval(intervalRef.current);
        intervalRef.current = null!;
    };

    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + interval / SECOND);
            }, interval);
        }
    };

    return {
        time,
        resetTimer,
        stopTimer,
        startTimer,
    };
};
