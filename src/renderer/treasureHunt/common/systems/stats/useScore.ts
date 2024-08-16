import { useState } from 'react';
import { initialScore } from '../../states/StatsState';
import { GAME_NAME, ipcRenderer } from '../../constants/Constants';

export const useScore = () => {
    const [score, setScore] = useState<number>(initialScore);
    const [rankList, setRankList] = useState<number[]>([]);

    const addScore = (points: number) => {
        setScore(prev => prev + points);
    };

    const resetScore = () => {
        setScore(initialScore);
    };

    const saveScore = async () => {
        console.log(`My final score is ${score}`);
        setRankList(await ipcRenderer.invoke('update-rank', { gameName: GAME_NAME, newScore: score }));
    };

    return { rankList, score, addScore, saveScore, resetScore };
};
