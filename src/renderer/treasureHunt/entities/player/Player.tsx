import { useEffect, useRef, useState } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useIntersection } from '../../common/utils/useIntersection';
import { useReset } from '../../common/utils/useReset';
import { useUpdate } from '../../common/utils/useUpdate';
import { DAMAGE } from '../../common/constants/Constants';
import { useGame } from '../../common/GameManager';
import { useLoader } from '@react-three/fiber';
import { NearestFilter, Sprite, Texture, TextureLoader } from 'three';

export const Player = () => {
    const { controls, deductHealth, player } = useGame();
    const { handleIntersectionEnter, handleIntersectionExit, resetIntersection } = useIntersection({
        targetName: 'Obstacle',
        onIntersection: () => deductHealth(DAMAGE),
    });
    const rigidBodyRef = useRef<RapierRigidBody>(null!);

    const elapsedTime = useRef<number>(0);
    const maxDisplayTime = useRef<number>(0.1); // total duration / textures.length
    
    const [runSpriteSheet, standSpriteSheet] = useLoader(TextureLoader, [
        '/character/john_run.png',
        '/character/john_stand_shooting_up.png',
    ]);
    const [tileIndex, setTileIndex] = useState<number>(2);
    const [animation, setAnimation] = useState<{ spriteSheet: Texture; numberOfTiles: number }>({spriteSheet: runSpriteSheet, numberOfTiles: 2});

    const setupSpriteSheet = (spriteSheet: Texture, repeatX: number) => {
        spriteSheet.magFilter = NearestFilter;
        spriteSheet.repeat.set(repeatX, 1);
    };

    useEffect(() => {
        setupSpriteSheet(runSpriteSheet, 0.1);
    }, [runSpriteSheet]);

    useEffect(() => {
        setupSpriteSheet(standSpriteSheet, 0.5);
    }, [standSpriteSheet]);

    useEffect(() => {
        animation.spriteSheet.offset.x = (tileIndex + 1) % animation.numberOfTiles / animation.numberOfTiles;
    }, [tileIndex]);

    useEffect(() => {
        elapsedTime.current = 0;
        setTileIndex(0);

        switch (player.player.movementState) {
            case 'MOVE_LEFT':
                runSpriteSheet.repeat.set(-0.1, 1);
                setAnimation({ spriteSheet: runSpriteSheet, numberOfTiles: 10 });
                break;
            case 'MOVE_RIGHT':
                runSpriteSheet.repeat.set(0.1, 1);
                setAnimation({ spriteSheet: runSpriteSheet, numberOfTiles: 10 });
                break;
            case 'STAND':
                setAnimation({ spriteSheet: standSpriteSheet, numberOfTiles: 2 });
                break;
        }
    }, [player.player.movementState]);

    useReset(() => {
        player.resetMovement(rigidBodyRef.current);
        resetIntersection();
    });

    useUpdate(delta => {
        if (!rigidBodyRef) return;
        elapsedTime.current += delta;
        if (maxDisplayTime.current > 0 && elapsedTime.current > maxDisplayTime.current) {
            elapsedTime.current = 0;
            setTileIndex(prev => (prev + 1) % 10);
        }

        player.checkMove(rigidBodyRef.current, controls, delta);
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders={'cuboid'}
            sensor={true}
            onIntersectionEnter={handleIntersectionEnter}
            onIntersectionExit={handleIntersectionExit}
            gravityScale={0}
            position={player.player.position}
        >
            <sprite>
                <spriteMaterial map={animation?.spriteSheet} />
            </sprite>
        </RigidBody>
    );
};
