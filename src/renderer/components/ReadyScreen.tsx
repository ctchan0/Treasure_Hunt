import { Box, Typography, CircularProgress } from '@mui/material';

export const ReadyScreen = ({ readyTime }: { readyTime: number }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
            <Typography
                variant="h1"
                gutterBottom
                sx={{ fontFamily: 'cursive', color: '#fbeee0', textShadow: '4px 4px 0 #422800' }}
            >
                Get Ready!
            </Typography>
            <Box position="relative" display="inline-flex">
                <CircularProgress size={100} sx={{ color: '#fbeee0' }} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        variant="h3"
                        component="div"
                        color="text.secondary"
                        sx={{ fontFamily: 'cursive', color: '#fbeee0', textShadow: '4px 4px 0 #422800' }}
                    >
                        {Math.round(readyTime)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
