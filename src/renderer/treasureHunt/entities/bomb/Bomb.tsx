import { useIntersect } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import { NearestFilter, TextureLoader, Vector3 } from 'three';
import { useIntersection } from '../../common/utils/useIntersection';
import { useReset } from '../../common/utils/useReset';
import { useGame } from '../../common/GameManager';

export const Bomb = ({ isActive, position }: { isActive: boolean; position: Vector3 }) => {
    // const [tileIndex, setTileIndex] = useState<number>(0);
    const { bullets } = useGame();
    const spriteSheet = useLoader(TextureLoader, '/bomb/bomb_fall_down.png');

    const dist = ( v1: Vector3, v2: Vector3 ) =>
    {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt( dx * dx + dy * dy + dz * dz );
    }

    useEffect(() => {
        // check if there is a collision 
        bullets.activeItems.forEach(
            bullet => {
                if (dist(bullet.state, position) < 0.3) 
                    console.log("DAMAGE")
            }
        )
    }, [bullets.activeItems, position])

    useEffect(() => {
        spriteSheet.magFilter = NearestFilter;
    }, [spriteSheet]);

    // useEffect(() => {
    //     spriteSheet.offset.x = (tileIndex + 1) % numberOfTiles / numberOfTiles;
    // }, [tileIndex]);

    return isActive ? (
        <sprite position={position} scale={[1.5, 1.5, 1.5]}>
            <spriteMaterial map={spriteSheet} />
        </sprite>
    ) : null;
};
