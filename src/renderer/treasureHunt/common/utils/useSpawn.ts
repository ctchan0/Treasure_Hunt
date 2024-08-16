import { useCallback, useMemo, useRef, useState } from 'react';

export const useSpawn = <T>() => {
    const items = useRef<{ id: number; isActive: boolean; state: T }[]>([])

    // (obsolete)
    // const add = useCallback(
    //     (itemState: T) => {
    //         setItems((prev) => {
    //             const newItems = [...prev, { id: prev.length, isActive: true, state: itemState }];
    //             console.log("Add: ", newItems)
    //             // ensure working with the latest state
    //             return newItems;
    //         });
    //         // console.log(items) // items won't update immediately
    //         items.current = [...items.current, { id: items.current.length, isActive: true, state: itemState }];
    //     },
    //     [items]
    // );

    const add = useCallback(
        (itemState: T) => {
            items.current = [...items.current, { id: items.current.length, isActive: true, state: itemState }];
        },
        [items.current]
    );

    const enable = useCallback(
        (id: number, itemState: T) => {
            items.current = items.current.map(i => (i.id === id ? { id: id, isActive: true, state: itemState } : i));
        },
        [items.current]
    );

    const resetItems = useCallback(() => {
        items.current = [];
    }, []);

    const spawn = useCallback(
        (newItem: T) => {
            // items won't update immediately due to asynchronous nature of state updates 
            // thus inactiveItem will always be the same despite that that inactiveItem is set to be active before
            const inactiveItem = items.current.find(i => i.isActive === false);
            if (inactiveItem) {
                enable(inactiveItem.id, newItem);
            } else {
                add(newItem);
            }
        },
        [items.current]
    );

    const disable = useCallback(
        (checkUnused: (itemState: T) => boolean) => {
            items.current = items.current.map(i => (checkUnused(i.state) ? { ...i, isActive: false } : i));
        },
        [items.current]
    );

    return useMemo(
        () => ({
            activeItems: items.current.filter(i => i.isActive),
            items,
            spawn,
            disable,
            resetItems,
        }),
        [items.current]
    );
};