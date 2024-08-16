import PopUpEffects from './PopUpEffect';
import RestartButton from './RestartButton';
import { SoundPlayButton } from './SoundPlayButton';

export const PopUpMenu = ({
    onResume,
    onRestart,
    isMute,
    toggleMusicMute,
}: {
    onResume: Function;
    onRestart: Function;
    isMute: boolean;
    toggleMusicMute: Function;
}) => {
    const classes = PopUpEffects();

    const handleResume = () => {
        onResume();
    };

    return (
        <div className={classes.OverlayEffect}>
            <div className={classes.PopupCard}>
                <h1 style={{ marginBottom: '50px', marginTop: '1px' }}>GAME MENU</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <button className={classes.Button} onClick={handleResume}>
                        RESUME
                    </button>

                    <RestartButton onRestart={() => onRestart()} />
                    <button className={classes.Button}>HOME</button>
                    <SoundPlayButton isMute={isMute} toggleMusicMute={toggleMusicMute} />
                </div>
            </div>
        </div>
    );
};
