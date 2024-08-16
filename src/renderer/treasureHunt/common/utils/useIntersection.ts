import { IntersectionEnterHandler, IntersectionExitHandler } from '@react-three/rapier';
import { useEffect, useState } from 'react';

export const useIntersection = ({ targetName, onIntersection }: { targetName: string; onIntersection: Function }) => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

    useEffect(() => {
        if (isIntersecting) onIntersection();
    }, [isIntersecting]);

    const handleIntersectionEnter: IntersectionEnterHandler = ({ other }) => {
        if (other.colliderObject!.name != targetName) return;

        setIsIntersecting(true);
    };

    const handleIntersectionExit: IntersectionExitHandler = () => {
        setIsIntersecting(false);
    };

    const resetIntersection = () => {
        setIsIntersecting(false);
    };

    return { handleIntersectionEnter, handleIntersectionExit, resetIntersection };
};
