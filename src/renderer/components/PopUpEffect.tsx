import { makeStyles } from '@mui/styles';

const PopUpEffects = makeStyles({
    PopupCard: {
        width: 300,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -190,
        backgroundColor: 'white',
        padding: 40,
        transform: 'translateY(-50%)',
        border: '10px solid #d3d3d3',
        color: '#333',
    },
    Button: {
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '12vw',
        height: '5vh',
        backgroundColor: '#dec267',
        borderRadius: 10,
        textAlign: 'center',
        margin: '2%',
    },
    OverlayEffect: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        cursor: 'default',
    },
});

export default PopUpEffects;
