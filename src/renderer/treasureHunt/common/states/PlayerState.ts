import { Vector3 } from 'three';

export interface PlayerMovementState {
    position: Vector3;
    movingSpd: number;
}

export const initialPlayerMovementState: PlayerMovementState = {
    position: new Vector3(),
    movingSpd: 6,
};

export type PlayerState = 'IDLE' | 'MOVE_LEFT' | 'MOVE_RIGHT';
