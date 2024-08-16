import { useCallback, useMemo } from 'react';

export const useRandom = () => {
    const getNum = useCallback((from: number, to: number, isInteger: boolean) => {
        const randomNum = Math.random() * (to - from) + from;
        return isInteger ? Math.floor(randomNum) : randomNum;
    }, []);

    return useMemo(() => ({ getNum }), [getNum]);
};
