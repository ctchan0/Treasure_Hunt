import { useFrame } from '@react-three/fiber';
import { useGame } from '../GameManager';

export const useUpdate = (onUpdate: (delta: number) => void) => {
    const { gameState } = useGame();
    useFrame((state, delta) => {
        if (gameState != 'PLAYING') return;
        onUpdate(delta);
    });
};
