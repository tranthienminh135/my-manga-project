import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const actions = [
    { icon: <EmailIcon />, name: 'Email' },
    { icon: <ShareIcon />, name: 'Share' },
];

export default function BasicSpeedDial() {
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
                        onClick={() => console.log(window.location.pathname)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
