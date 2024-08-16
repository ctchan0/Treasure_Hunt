import { useEffect } from 'react';
import { useGame } from '../GameManager';

export const useReset = (onReset: Function) => {
    const { addResetListener } = useGame();

    useEffect(() => {
        addResetListener(onReset);
    }, []);
};
