export interface BackgroundMusicState {
    src: string;
    isPlaying: boolean;
    isMute: boolean;
}

export const intialBackgroundMusicState: BackgroundMusicState = {
    src: '/audio/beanfeast.mp3',
    isPlaying: false,
    isMute: false,
};
