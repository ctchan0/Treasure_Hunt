import { useState } from 'react';
import { initialLevel } from '../../states/StatsState';

export const useLevel = () => {
    const [level, setLevel] = useState<number>(initialLevel);

    const increaseLevel = () => {
        setLevel(prev => prev + 1);
    };

    const resetLevel = () => {
        setLevel(initialLevel);
    };

    return { level, increaseLevel, resetLevel };
};
