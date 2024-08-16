import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PositionPoint } from '@react-three/drei';
import { InstancedMesh, Object3D, Vector3 } from 'three';
import { useUpdate } from '../../common/utils/useUpdate';
import { useRandom } from '../../common/utils/useRandom';

export const ParticleSystem = ({ count }: { count: number }) => {
    const meshRef = useRef<InstancedMesh>(null);
    const dummy = useMemo(() => new Object3D(), []);
    const random = useRandom()

    // random particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new Vector3(random.getNum(-1, 1, false), random.getNum(-1, 1, false), 0),
                speed: Math.random() * 0.1 + 0.05,
            });
        }
        return temp;
    }, [count]);

    useUpdate(delta => {
        if (meshRef.current) {
            particles.forEach((particle, i) => {
                let { position, speed } = particle;
                // position movement
                position.y += speed;
                if (position.y > 1) position.y = -1;
                dummy.position.copy(position);
                dummy.updateMatrix();
                meshRef.current!.setMatrixAt(i, dummy.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
        </instancedMesh>
    );
};
