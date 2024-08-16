import { useCallback, useMemo, useState } from 'react';

export const useSpawn = <T>() => {
    const [items, setItems] = useState<{ id: number; isActive: boolean; state: T }[]>([]);

    const add = useCallback(
        (itemState: T) => {
            setItems(prev => [...prev, { id: items.length, isActive: true, state: itemState }]);
        },
        [items]
    );

    const enable = useCallback(
        (id: number, itemState: T) => {
            setItems(prev => prev.map(i => (i.id === id ? { id: id, isActive: true, state: itemState } : i)));
        },
        [items]
    );

    const resetItems = useCallback(() => {
        setItems([]);
    }, []);

    const spawn = useCallback(
        (newItem: T) => {
            const inactiveItem = items.find(i => i.isActive === false);
            if (inactiveItem) {
                enable(inactiveItem.id, newItem);
            } else {
                add(newItem);
            }
        },
        [items]
    );

    const disable = useCallback(
        (checkUnused: (itemState: T) => boolean) => {
            setItems(prev => prev.map(i => (checkUnused(i.state) ? { ...i, isActive: false } : i)));
        },
        [items]
    );

    return useMemo(
        () => ({
            activeItems: items.filter(i => i.isActive),
            items,
            setItems,
            spawn,
            disable,
            resetItems,
        }),
        [items]
    );
};
