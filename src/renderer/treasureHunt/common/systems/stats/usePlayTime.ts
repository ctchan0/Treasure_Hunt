import { END_TIME, READY_TIME } from '../../constants/Constants';
import { useTimer } from '../../utils/useTimer';

export const usePlayTime = () => {
    const { time, startTimer, stopTimer, resetTimer } = useTimer();

    return {
        readyTime: Math.max(END_TIME, READY_TIME - time),
        playTime: Math.max(0, time - READY_TIME + END_TIME),
        startTimer,
        stopTimer,
        resetTimer,
    };
};
