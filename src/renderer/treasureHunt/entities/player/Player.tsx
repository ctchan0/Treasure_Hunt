import { useRef } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useIntersection } from '../../common/utils/useIntersection';
import { usePlayerMovement } from '../../common/systems/player/usePlayerMovement';
import { useReset } from '../../common/utils/useReset';
import { useUpdate } from '../../common/utils/useUpdate';
import { DAMAGE } from '../../common/constants/Constants';
import { useGame } from '../../common/GameManager';

export const Player = () => {
    const { controls, deductHealth, resetMovement, checkMove } = useGame();
    const { handleIntersectionEnter, handleIntersectionExit, resetIntersection } = useIntersection({targetName: "Obstacle", onIntersection: () => deductHealth(DAMAGE)})
    
    const rigidBodyRef = useRef<RapierRigidBody>(null!);

    useReset(() => {
        resetMovement(rigidBodyRef.current);
        resetIntersection();
    });

    useUpdate(delta => {
        if (!rigidBodyRef) return;
        checkMove(rigidBodyRef.current, controls, delta);
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders={'cuboid'}
            sensor={true}
            onIntersectionEnter={handleIntersectionEnter}
            onIntersectionExit={handleIntersectionExit}
            gravityScale={0}
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'#dec267'} />
            </mesh>
        </RigidBody>
    );
};