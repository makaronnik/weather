import ColorModeIconDropdown from '@/Components/ColorModeIconDropdown';
import weather from '@/animations/weather.json';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { useLottie } from 'lottie-react';

export default function Header() {
    const { View } = useLottie(
        {
            animationData: weather,
            loop: false,
        },
        { height: 40, width: 40 },
    );

    return (
        <AppBar
            sx={{
                backgroundColor: 'paper',
                color: 'primary.contrastText',
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            component="header"
        >
            <div className="flex items-center gap-4">
                <div>{View}</div>

                <Typography variant="h4" component="h1">
                    Weather Forecast
                </Typography>
            </div>

            <ColorModeIconDropdown />
        </AppBar>
    );
}
