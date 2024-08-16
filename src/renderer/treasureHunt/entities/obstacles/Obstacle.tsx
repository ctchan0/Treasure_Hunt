import { RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';

const Obstacle = ({ isActive, position }: { isActive: boolean; position: Vector3 }) => {
    return isActive ? (
        <RigidBody colliders="cuboid" position={position} sensor={true} gravityScale={0} name='Obstacle'>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'black'} />
            </mesh>
        </RigidBody>
    ) : null;
};

export default Obstacle;
