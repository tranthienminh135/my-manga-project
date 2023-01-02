import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { FACEBOOK, YOUTUBE_PARAMS } from '../../core/constants/common';
import { targetUrl } from '../../core/constants/function';

const actions = [
    { icon: <FacebookIcon />, name: 'Facebook', url: `https://www.facebook.com/profile.php?id=${FACEBOOK.PAGE_ID}` },
    { icon: <YouTubeIcon />, name: 'Youtube', url: `https://www.youtube.com/channel/${YOUTUBE_PARAMS.CHANNEL_ID}` },
];

export default function BasicSpeedDial() {
    const handleTargetChannel = (url: string) => {
        targetUrl(url);
    };
    return (
        <Box
            sx={{
                height: 320,
                transform: 'translateZ(0px)',
                flexGrow: 1,
                position: 'fixed',
                bottom: 30,
                right: 20,
                zIndex: 1,
            }}
        >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleTargetChannel(action.url)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
