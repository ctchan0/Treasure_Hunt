import { CollisionEnterHandler, CollisionExitHandler } from '@react-three/rapier';
import { useEffect, useState } from 'react';

export const useCollision = ({ targetName, onCollision }: { targetName: string; onCollision: Function }) => {
    const [isColliding, setIsColliding] = useState<boolean>(false);

    useEffect(() => {
        if (isColliding) onCollision();
    }, [isColliding]);


    const handleCollisionEnter: CollisionEnterHandler = ({ manifold, other }) => {
        if (other.colliderObject!.name != targetName) return;

        const contact = manifold?.solverContactPoint(0) as {
            x: number;
            y: number;
            z: number;
        };

        if (contact) setIsColliding(true);
    };

    const handleCollisionExit: CollisionExitHandler = () => {
        setIsColliding(false);
    };

    const resetCollision = () => {
        setIsColliding(false)
    }

    return [handleCollisionEnter, handleCollisionExit, resetCollision];
};
