import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    scoreContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderRadius: 10,
        fontWeight: 'bold',
        color: '#696969',
        position: 'absolute',
        top: '5%',
        left: '5%',
    },
    contentItem: {
        marginRight: '10%',
    },
});

export const ScoringBoard = ({
    level,
    playingTime,
    score,
    health,
}: {
    level: number;
    playingTime: number;
    score: number;
    health: number;
}) => {
    const classes = useStyles();

    return (
        <div className={classes.scoreContainer}>
            <div className={classes.contentItem}>SCORE: {score}</div>
            <div className={classes.contentItem}>TIME: {playingTime.toFixed(1)}</div>
            <div className={classes.contentItem}>LEVEL: {level}</div>
            <div className={classes.contentItem}>HEALTH: {health}</div>
        </div>
    );
};
