import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// State
import { InputControlsState } from './states/InputControlsState';
// UI
import { GameOverBoard } from '../../components/GameOverBoard';
import { ScoringBoard } from '../../components/ScoringBoard';
import { PopUpMenu } from '../../components/GameMenu';
import { MenuButton } from '../../components/MenuButton';
import { ReadyScreen } from '../../components/ReadyScreen';
// Custom hooks
import { usePlayTime } from './systems/stats/usePlayTime';
import { useKeyboard } from './systems/input_controls/useKeyboard';
import { useBackgroundMusic } from './systems/audio/useBackgroundMusic';
import { useScore } from './systems/stats/useScore';
import { useLevel } from './systems/stats/useLevel';
import { useHealth } from './systems/stats/useHealth';
import { END_TIME } from './constants/Constants';
import { RigidBody } from '@dimforge/rapier3d-compat';
import { usePlayer } from '../entities/player/usePlayer';
import { PlayerState } from '../entities/player/PlayerState';
import { useSpawn } from './utils/useSpawn';
import { Vector3 } from 'three';

const GameState = ['IDLE', 'READY', 'PLAYING', 'GAME_OVER'] as const;
type GameState = (typeof GameState)[number];

type GameContextType = {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    controls: InputControlsState;
    deductHealth: (damage: number) => void;
    playTime: number;
    addResetListener: (listener: Function) => void;
    player : {
        checkMove: (rb: RigidBody, controls: InputControlsState, delta: number) => void;
        resetMovement: (rb: RigidBody) => void;
        player: PlayerState;
    }
    bullets: {
        activeItems: {
            id: number;
            isActive: boolean;
            state: Vector3;
        }[];
        items: React.MutableRefObject<{
            id: number;
            isActive: boolean;
            state: Vector3;
        }[]>;
        spawn: (newItem: Vector3) => void;
        disable: (checkUnused: (itemState: Vector3) => boolean) => void;
        resetItems: () => void;
    }
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export default function GameManager({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameState>('READY');
    const resetListeners = useRef<Function[]>([]);

    const { health, recoverHealth, deductHealth, resetHealth } = useHealth();
    const { level, increaseLevel, resetLevel } = useLevel();
    const { readyTime, playTime, startTimer, stopTimer, resetTimer } = usePlayTime();
    const { controls, resetControls } = useKeyboard();
    const { music, startMusic, stopMusic, toggleMusicMute, resetMusic } = useBackgroundMusic();
    const { rankList, score, addScore, saveScore, resetScore } = useScore();
    const player = usePlayer()
    const bullets = useSpawn<Vector3>();

    useEffect(() => {
        if (gameState != 'READY') return;
        if (readyTime == END_TIME) {
            setGameState('PLAYING');
            console.log('Game started !');
        }
    }, [readyTime]);

    // Scoring
    useEffect(() => {
        addScore(Math.round(playTime));
    }, [playTime]);

    // Level increment
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (gameState === 'PLAYING') {
            interval = setInterval(() => {
                increaseLevel();
            }, 5000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [gameState]);

    useEffect(() => {
        switch (gameState) {
            case 'READY':
                console.log('Game is about to begin !'); // call once
                startTimer();
                startMusic();
                break;
            case 'IDLE':
                stopTimer();
                break;
            case 'PLAYING':
                startTimer();
                break;
            case 'GAME_OVER':
                console.log('Game Over !');
                stopTimer();
                stopMusic();
                saveScore();
                break;
        }
    }, [gameState]);

    useEffect(() => {
        if (health <= 0) setGameState('GAME_OVER');
    }, [health]);

    const reset = () => {
        console.log('Restart the game');
        resetTimer();
        resetControls();
        resetScore();
        resetMusic();
        resetHealth();
        resetLevel();
        resetEntities();
        setGameState('READY'); // set game state to ready to reset all the entity state
    };

    const pause = () => {
        setGameState('IDLE');
    };

    const resume = () => {
        setGameState('PLAYING');
    };

    const resetEntities = () => {
        resetListeners.current.forEach(listener => listener());
    };

    const addResetListener = useCallback((listener: Function) => {
        resetListeners.current.push(listener);
    }, []);

    const context = useMemo(
        () => ({
            gameState,
            setGameState,
            controls,
            deductHealth,
            playTime,
            addResetListener,
            player,
            bullets
        }),
        [gameState, playTime, controls, health, addResetListener, player, bullets]
    );

    const gameUI = useMemo(() => {
        switch (gameState) {
            case 'IDLE':
                return (
                    <PopUpMenu
                        onResume={() => resume()}
                        onRestart={() => reset()}
                        isMute={music.isMute}
                        toggleMusicMute={toggleMusicMute}
                    />
                );
            case 'PLAYING':
                return (
                    <div>
                        <ScoringBoard score={score} playingTime={playTime} level={level} health={health} />
                        <MenuButton onPaused={() => pause()} />
                    </div>
                );
            case 'READY':
                return <ReadyScreen readyTime={readyTime} />;
            case 'GAME_OVER':
                return (
                    <GameOverBoard score={score} playingTime={playTime} rankList={rankList} onRestart={() => reset()} />
                );
        }
    }, [gameState, playTime, readyTime, score, rankList, level, health, music]);

    return (
        <GameContext.Provider value={context}>
            <Canvas
                gl={{ pixelRatio: window.devicePixelRatio }}
                style={{ width: '100vw', height: '100vh' }}
                frameloop={gameState == 'PLAYING' || gameState == 'READY' ? 'always' : 'never'}
            >
                {children}
            </Canvas>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                }}
            >
                {gameUI}
            </div>
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);
