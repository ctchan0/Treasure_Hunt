import { useCallback, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { initialPlayerState, PlayerState } from './PlayerState';
import { InputControlsState } from '../../common/states/InputControlsState';
import { BOUNDARY_LEFT, BOUNDARY_RIGHT } from './Const';


export const usePlayer = () => {
    const [player, setPlayer] = useState<PlayerState>(initialPlayerState);

    const checkMove = useCallback(
        (rb: RapierRigidBody, controls: InputControlsState, delta: number) => {
            const { moveLeft, moveRight } = controls;

            const currentPos = rb.translation();

            var nextXPos: number = currentPos.x;
            if (moveLeft && !moveRight) {
                nextXPos = currentPos.x - player.movingSpd * delta;
            } else if (moveRight && !moveLeft) {
                nextXPos = currentPos.x + player.movingSpd * delta;
            }

            // Enforce boundary
            const clampedXPos = Math.min(BOUNDARY_RIGHT, Math.max(nextXPos, BOUNDARY_LEFT));
            const newPos = new Vector3(clampedXPos, currentPos.y, currentPos.z);
            rb.setTranslation(vec3(newPos), true);
            setPlayer(prev => ({ ...prev, position: newPos }));
        },
        [player]
    );

    const resetMovement = useCallback((rb: RapierRigidBody) => {
        rb.setTranslation(initialPlayerState.position, true);
        rb.setLinvel(vec3(initialPlayerState.position), true);
        setPlayer(initialPlayerState);
    }, []);

    return useMemo(
        () => ({
            checkMove,
            resetMovement,
            player,
        }),
        [player]
    );
};
