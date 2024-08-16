import { Vector3 } from 'three';

export const ipcRenderer = window.electron.ipcRenderer;
export const GAME_NAME = 'template'

//===== Time =====
export const READY_TIME = 3;
export const END_TIME = 1;
export const SECOND = 1000;

//===== Music ======
export const AUDIO_VOLUME = 0.5;

//===== Player =====
export const DAMAGE = 1;
export const PlayerPosition: { [key: string]: number } = {
    Left: -5,
    Center: 0,
    Right: 5,
};

//===== Environment ======
export const BEHIND_CAMERA = 12;
export const SPAWN_POSITION: Vector3 = new Vector3(0, 0, -30);
export const SPAWN_INTERVAL = 2;
export const OBSTACLE_MOVING_SPEED = 6;
