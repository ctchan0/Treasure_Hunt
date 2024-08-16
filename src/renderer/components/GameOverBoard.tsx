import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Paper,
} from '@mui/material';

export const GameOverBoard = ({
    score,
    playingTime,
    rankList,
    onRestart,
}: {
    score: number;
    playingTime: number;
    rankList: number[];
    onRestart: Function;
}) => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                }}
            >
                <Typography
                    variant="h1"
                    gutterBottom
                    sx={{ fontFamily: 'cursive', color: '#fbeee0', textShadow: '4px 4px 0 #422800' }}
                >
                    Game Over
                </Typography>

                <Box
                    sx={{
                        mb: 4,
                        textAlign: 'center',
                    }}
                >
                    {/* Score Row */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontFamily: '"Orbitron"', marginRight: 1 }}>
                            Score:
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{ fontFamily: '"Arsenal"', color: '#fbeee0', textShadow: '4px 4px 0 #422800' }}
                        >
                            {score}
                        </Typography>
                    </Box>

                    {/* Playtime Row */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontFamily: '"Orbitron"', marginRight: 1 }}>
                            Playtime:
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{ fontFamily: '"Arsenal"', color: '#fbeee0', textShadow: '4px 4px 0 #422800' }}
                        >
                            {Number(playingTime.toPrecision(2))}
                        </Typography>
                    </Box>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{ maxWidth: 400, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                >
                    <Table className="rankTable">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rankList &&
                                rankList.map((score, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{score}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        fontFamily: 'Press Start 2P',
                        backgroundColor: '#ff9800',
                        '&:hover': {
                            backgroundColor: '#e65100',
                        },
                        borderRadius: '10',
                        padding: '10px 20px',
                        boxShadow: '#422800 4px 4px 0 0',
                        transition: '0.5s',
                    }}
                    onClick={onRestart}
                >
                    Play Again
                </Button>
            </Box>
        </div>
    );
};
