import { useState } from 'react';
import { initialHealth } from '../../states/StatsState';

export const useHealth = () => {
    const [health, setHealth] = useState<number>(initialHealth);

    const deductHealth = (damage: number) => {
        setHealth(prev => Math.max(0, prev - damage));
    };

    const recoverHealth = (healingPoint: number) => {
        setHealth(prev => Math.max(initialHealth, prev + healingPoint));
    };

    const resetHealth = () => {
        setHealth(initialHealth);
    };

    return { health, deductHealth, recoverHealth, resetHealth };
};
