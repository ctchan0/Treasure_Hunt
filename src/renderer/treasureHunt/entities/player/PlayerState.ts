import { Vector3 } from 'three';

export interface PlayerState {
    movementState: PlayerMovementState
    position: Vector3;
    movingSpd: number;
}

export const initialPlayerState: PlayerState = {
    position: new Vector3(0, -1, 0),
    movingSpd: 6,
    movementState: 'STAND'
};

export const PlayerMovementState = ['MOVE_LEFT', 'MOVE_RIGHT', 'STAND'] as const
export type PlayerMovementState = (typeof PlayerMovementState)[number]