import { useRef } from 'react';
import { Vector3 } from 'three';
import { useSpawn } from '../../common/utils/useSpawn';
import {
    BEHIND_CAMERA,
    OBSTACLE_MOVING_SPEED,
    PlayerPosition,
    SPAWN_INTERVAL,
    SPAWN_POSITION,
} from '../../common/constants/Constants';
import { useReset } from '../../common/utils/useReset';
import { useUpdate } from '../../common/utils/useUpdate';
import { useRandom } from '../../common/utils/useRandom';
import { useGame } from '../../common/GameManager';
import Obstacle from './Obstacle';

export default function Obstacles() {
    const { playTime } = useGame();
    const random = useRandom();
    const { items, resetItems, spawn, disable, setItems } = useSpawn<Vector3>();
    const spawnTime = useRef<number>(0);

    // TODO: random the position
    const buildObstacle = () => {
        const keys = Object.keys(PlayerPosition); // [ 'Left', 'Center', 'Right' ]
        return new Vector3(PlayerPosition[keys[random.getNum(0, keys.length, true)]], SPAWN_POSITION.y, SPAWN_POSITION.z);
    };

    const checkBehindCamera = (position: Vector3) => {
        return position.z > BEHIND_CAMERA;
    };

    const updateMove = (delta: number) => {
        setItems(prev =>
            prev.map(item => ({
                ...item,
                state: new Vector3(item.state.x, item.state.y, item.state.z + OBSTACLE_MOVING_SPEED * delta),
            }))
        );
    };

    useReset(() => {
        spawnTime.current = playTime;
        resetItems();
    });

    useUpdate(delta => {
        if (playTime > spawnTime.current) {
            spawn(buildObstacle());
            spawnTime.current += SPAWN_INTERVAL;
        }

        updateMove(delta);
        disable(checkBehindCamera);
    });

    return items.map((item, index) => <Obstacle key={index} isActive={item.isActive} position={item.state} />);
}
