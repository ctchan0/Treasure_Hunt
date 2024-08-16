import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { NearestFilter, TextureLoader, Vector3 } from "three";

const numberOfTiles  = 5

export const Bullet = ({position} : {position: Vector3}) => {
    // const [tileIndex, setTileIndex] = useState<number>(0);
    const spriteSheet = useLoader(TextureLoader, '/bullet/bullet_impact.png') 

    useEffect(() => {
        spriteSheet.magFilter = NearestFilter;
        spriteSheet.repeat.set(1/numberOfTiles, 1);
    }, [spriteSheet])

    // useEffect(() => {
    //     spriteSheet.offset.x = (tileIndex + 1) % numberOfTiles / numberOfTiles;
    // }, [tileIndex]);

    return (
        <sprite position={position} scale={[0.5, 0.5, 0.5]}>
            <spriteMaterial map={spriteSheet} />
        </sprite>
    );
}