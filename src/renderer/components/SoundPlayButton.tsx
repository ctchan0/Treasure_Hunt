import { makeStyles } from '@mui/styles';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const useStyles = makeStyles({
    MainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export const SoundPlayButton = ({ isMute, toggleMusicMute }: { isMute: boolean; toggleMusicMute: Function }) => {
    const classes = useStyles();

    return (
        <div className={classes.MainContainer}>
            {isMute ? <VolumeOffIcon onClick={toggleMusicMute} /> : <VolumeUpIcon onClick={toggleMusicMute} />}
        </div>
    );
};
