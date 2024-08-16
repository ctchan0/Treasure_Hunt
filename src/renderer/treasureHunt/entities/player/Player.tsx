import { useEffect, useRef, useState } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useIntersection } from '../../common/utils/useIntersection';
import { useReset } from '../../common/utils/useReset';
import { useUpdate } from '../../common/utils/useUpdate';
import { DAMAGE } from '../../common/constants/Constants';
import { useGame } from '../../common/GameManager';
import { useLoader } from '@react-three/fiber';
import { NearestFilter, Sprite, Texture, TextureLoader, Vector3 } from 'three';
import { Bullet } from '../bullet/Bullet';
import { useSpawn } from '../../common/utils/useSpawn';
import { BULLET_SPEED } from './Const';

export const Player = () => {
    const { controls, deductHealth, player, bullets } = useGame();
    const rigidBodyRef = useRef<RapierRigidBody>(null!);

    // ========================= Animation ==============================
    const elapsedTime = useRef<number>(0);
    const maxDisplayTime = useRef<number>(0.1); // total duration / textures.length
    const [runSpriteSheet, standSpriteSheet] = useLoader(TextureLoader, [
        '/character/john_run.png',
        '/character/john_stand_shooting_up.png',
    ]);
    const [tileIndex, setTileIndex] = useState<number>(0);
    const [animation, setAnimation] = useState<{ spriteSheet: Texture; numberOfTiles: number }>({
        spriteSheet: runSpriteSheet,
        numberOfTiles: 2,
    });
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
        animation.spriteSheet.offset.x = ((tileIndex + 1) % animation.numberOfTiles) / animation.numberOfTiles;
    }, [tileIndex]);
    useEffect(() => {
        elapsedTime.current = 0;
        setTileIndex(0);
        switch (player.player.movementState) {
            case 'MOVE_LEFT':
                disableShooting();
                runSpriteSheet.repeat.set(-0.1, 1);
                setAnimation({ spriteSheet: runSpriteSheet, numberOfTiles: 10 });
                break;
            case 'MOVE_RIGHT':
                disableShooting();
                runSpriteSheet.repeat.set(0.1, 1);
                setAnimation({ spriteSheet: runSpriteSheet, numberOfTiles: 10 });
                break;
            case 'STAND':
                enableShooting();
                setAnimation({ spriteSheet: standSpriteSheet, numberOfTiles: 2 });
                break;
        }
    }, [player.player.movementState]);
    //=======================================================================

    const enableShooting = () => {
        // spawn bullets from player
    };

    const disableShooting = () => {
        // stop shooting
    };

    useReset(() => {
        player.resetMovement(rigidBodyRef.current);

        bullets.resetItems(); // bullet
    });

    useUpdate(delta => {
        if (!rigidBodyRef) return;
        elapsedTime.current += delta;
        if (maxDisplayTime.current > 0 && elapsedTime.current > maxDisplayTime.current) {
            elapsedTime.current = 0;
            setTileIndex(prev => (prev + 1) % 10);
            if (player.player.movementState == 'STAND')
                bullets.spawn(player.player.position.add(new Vector3(0, 0.55, 0)));
        }

        player.checkMove(rigidBodyRef.current, controls, delta);

        updateBulletMove(delta);
        bullets.disable(isOutsideCamera);
    });

    const isOutsideCamera = (bulletPos: Vector3) => {
        return Math.abs(player.player.position.y - bulletPos.y) > 20;
    };

    const updateBulletMove = (delta: number) => {
        bullets.items.current = bullets.items.current.map(item => ({
            ...item,
            state: new Vector3(item.state.x, item.state.y + BULLET_SPEED * delta, item.state.z),
        }));
    };

    return (
        <group>
            <RigidBody
                ref={rigidBodyRef}
                colliders={'cuboid'}
                sensor={true}
                gravityScale={0}
                position={player.player.position}
            >
                <sprite>
                    <spriteMaterial map={animation?.spriteSheet} />
                </sprite>
            </RigidBody>
            
            {bullets.items.current.map((item, index) => (
                <Bullet key={index} isActive={item.isActive} position={item.state} />
            ))}
        </group>
    );
};
