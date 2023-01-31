import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TitlebarImageList from './list-items/title-bar-image-list';

export default function Main() {
    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                },
                maxHeight: '1380px',
                marginBottom: '24px !important',
                paddingTop: '0px !important',
            }}
        >
            <TitlebarImageList />
            <Divider />
        </Grid>
    );
}
