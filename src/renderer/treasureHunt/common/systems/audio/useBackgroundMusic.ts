import { useEffect, useRef, useState } from 'react';
import { AUDIO_VOLUME } from '../../constants/Constants';
import { BackgroundMusicState, intialBackgroundMusicState } from '../../states/AudioState';

export const useBackgroundMusic = () => {
    const [music, setMusic] = useState<BackgroundMusicState>(intialBackgroundMusicState);
    const audioRef = useRef<HTMLAudioElement>(null!);
    const playTimeout = useRef<any>(null!);

    useEffect(() => {
        if (!music.src) return;
        audioRef.current = new Audio(music.src);
        audioRef.current.loop = true;
        audioRef.current.volume = AUDIO_VOLUME; // Adjust volume as needed
    }, [music.src]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (music.isPlaying) {
            playTimeout.current = setTimeout(() => {
                audioRef.current &&
                    audioRef.current.play().catch(error => console.error('Audio playback failed:', error));
                unMuteMusic();
            });
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            clearTimeout(playTimeout.current);
        }
    }, [music.isPlaying]);

    const resetMusic = () => {
        stopMusic();
    };

    const startMusic = () => {
        if (!music.isPlaying) toggleMusicPlay();
    };

    const stopMusic = () => {
        if (music.isPlaying) toggleMusicPlay();
    };

    const unMuteMusic = () => {
        if (music.isMute) toggleMusicMute();
    };

    useEffect(() => {
        if (!audioRef.current) return;

        if (music.isMute) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = AUDIO_VOLUME;
        }
    }, [music.isMute]);

    const toggleMusicMute = () => setMusic(prev => ({ ...prev, isMute: !prev.isMute }));

    const toggleMusicPlay = () => setMusic(prev => ({ ...prev, isPlaying: !prev.isPlaying }));

    return { music, startMusic, stopMusic, toggleMusicMute, resetMusic };
};
