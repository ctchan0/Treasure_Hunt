import { useEffect, useState } from 'react';
import { initialInputControlsState, InputControlsState } from '../../states/InputControlsState';

export const useKeyboard = () => {
    const [controls, setControls] = useState<InputControlsState>(initialInputControlsState);

    const pressed: any = [];
    const useKeys = (target: Array<String>, event: (a: boolean) => void, up = true) => {
        useEffect(() => {
            const downHandler = (e: KeyboardEvent) => {
                if (target.indexOf(e.key) !== -1) {
                    const isRepeating = !!pressed[e.keyCode];
                    pressed[e.keyCode] = true;
                    if (up || !isRepeating) event(true);
                }
            };

            const upHandler = (e: KeyboardEvent) => {
                if (target.indexOf(e.key) !== -1) {
                    pressed[e.keyCode] = false;
                    if (up) event(false);
                }
            };

            window.addEventListener('keydown', downHandler, { passive: true });
            window.addEventListener('keyup', upHandler, { passive: true });
            return () => {
                window.removeEventListener('keydown', downHandler);
                window.removeEventListener('keyup', upHandler);
            };
        }, [target, event, up]);
    };

    useKeys(['ArrowLeft', 'a', 'A'], isLeft => setControls(prev => ({ ...prev, moveLeft: isLeft })));
    useKeys(['ArrowRight', 'd', 'D'], isRight => setControls(prev => ({ ...prev, moveRight: isRight })));

    const resetControls = () => {
        setControls(initialInputControlsState);
    };

    return { controls, resetControls };
};
