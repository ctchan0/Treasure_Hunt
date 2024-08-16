import { Vector3 } from "three";
import { useSpawn } from "../../common/utils/useSpawn";
import { useRef } from "react";
import { DURATION_TIME } from "./Const";
import { useUpdate } from "../../common/utils/useUpdate";
import { useGame } from "../../common/GameManager";

export const ObstacleManager = () => {
    const {playTime} = useGame()
    const { items, resetItems, spawn, disable} = useSpawn<{position: Vector3, health: number}>();
    const spawnTime = useRef<number>(DURATION_TIME);



    useUpdate(delta => {
        if (playTime > spawnTime.current) {
            // spawn
            spawn({
                position: new Vector3,
                health: 3
            })
            spawnTime.current += DURATION_TIME
        }

        // updateMove(delta);
        // disable(isBehindCamera);
    });

}