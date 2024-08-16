import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    menuButton: {
        cursor: 'pointer',
        display: 'flex',
        color: 'grey',
        position: 'absolute',
        top: '5%',
        right: '5%',
    },
});

export const MenuButton = ({ onPaused }: { onPaused: Function }) => {
    const classes = useStyles();

    const handlePause = () => {
        onPaused();
    };

    return <PauseCircleOutlineIcon fontSize="large" onClick={handlePause} className={classes.menuButton} />;
};
