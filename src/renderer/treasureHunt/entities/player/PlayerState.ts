import { Vector3 } from 'three';

export interface PlayerState {
    position: Vector3;
    movingSpd: number;
}

export const initialPlayerState: PlayerState = {
    position: new Vector3(0, -1, 0),
    movingSpd: 6,
};
