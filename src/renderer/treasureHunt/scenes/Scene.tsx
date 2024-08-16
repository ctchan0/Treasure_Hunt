import { Physics } from '@react-three/rapier';
import { Player } from '../entities/player/Player';
import { useUpdate } from '../common/utils/useUpdate';
import FollowCamera from '../entities/camera/FollowCamera';
import { useGame } from '../common/GameManager';
import { ParticleSystem } from '../entities/visualEffect/ParticleSystem';
import { Vector3 } from 'three';
import { PerspectiveCamera } from '@react-three/drei';

const Scene = () => {
    const { playTime } = useGame();

    useUpdate(delta => {
        // TODO: increase level
    });

    return (
        <group>
            <ambientLight intensity={0.5} />

            <Physics colliders={false}>
                <Player />
            </Physics>
        </group>
    );
};

export default Scene;
