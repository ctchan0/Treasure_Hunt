import { useCallback } from 'react';
import PopUpEffects from './PopUpEffect';

export default function RestartButton({ onRestart }: { onRestart: Function }) {
    const classes = PopUpEffects();

    const handleClick = useCallback(() => {
        onRestart();
    }, []);

    return (
        <button className={classes.Button} onClick={() => handleClick()}>
            RESTART
        </button>
    );
}
