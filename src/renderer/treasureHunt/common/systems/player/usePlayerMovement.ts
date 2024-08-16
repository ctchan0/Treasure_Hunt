import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { RapierRigidBody, vec3 } from '@react-three/rapier';
import { initialPlayerMovementState, PlayerMovementState, PlayerState } from '../../states/PlayerState';
import { PlayerPosition } from '../../constants/Constants';
import { InputControlsState } from '../../states/InputControlsState';

export const usePlayerMovement = () => {
    const [playerMovement, setPlayerMovement] = useState<PlayerMovementState>(initialPlayerMovementState);

    const [playerState, setPlayerState] = useState<PlayerState>('IDLE');
    const currentPos = useRef<Vector3>(initialPlayerMovementState.position);
    const targetPos = useRef<Vector3>(initialPlayerMovementState.position);

    useEffect(() => {
        // update player movement if state changed
        switch (playerState) {
            case 'MOVE_LEFT':
                targetPos.current = new Vector3(
                    Math.max(targetPos.current.x + PlayerPosition['Left'], PlayerPosition['Left']),
                    targetPos.current.y,
                    targetPos.current.z
                );
                break;
            case 'MOVE_RIGHT':
                targetPos.current = new Vector3(
                    Math.min(targetPos.current.x + PlayerPosition['Right'], PlayerPosition['Right']),
                    targetPos.current.y,
                    targetPos.current.z
                );
                break;
        }
    }, [playerState]);

    const checkMove = useCallback(
        (rb: RapierRigidBody, controls: InputControlsState, delta: number) => {
            const { moveLeft, moveRight } = controls;
            currentPos.current = vec3(rb.translation());

            // check conditions
            if (moveLeft && !moveRight) {
                setPlayerState('MOVE_LEFT');
            } else if (!moveLeft && moveRight) {
                setPlayerState('MOVE_RIGHT');
            } else {
                setPlayerState('IDLE');
            }
            // lerping if not reached to target yet
            if (currentPos.current.x != targetPos.current.x) {
                currentPos.current.lerp(targetPos.current, 1 - Math.exp(-playerMovement.movingSpd * delta));
                rb.setTranslation(currentPos.current, true);
                // update new position
                setPlayerMovement(prev => ({ ...prev, position: currentPos.current.clone() }));
            }
        },
        [playerState, playerMovement]
    );

    const resetMovement = useCallback((rb: RapierRigidBody) => {
        setPlayerState('IDLE');
        targetPos.current = initialPlayerMovementState.position;
        currentPos.current = initialPlayerMovementState.position;
        rb.setTranslation(currentPos.current, true);

        setPlayerMovement(initialPlayerMovementState);
    }, []);

    return useMemo(
        () => ({
            checkMove,
            resetMovement,
            playerMovement,
        }),
        [playerMovement]
    );
};
