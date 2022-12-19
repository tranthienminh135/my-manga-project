import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './content.scss';

export default function Content() {
    console.log(window.innerHeight);

    return (
        <div style={{ maxHeight: `${window.innerHeight}px`, overflow: 'scroll' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} className="">
                    <Grid item lg={3} md={3} xs={12}></Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <iframe
                            width="100%"
                            height={window.innerHeight}
                            src="https://www.youtube.com/embed/bhLsyi6bfJE"
                            title="Tập 14 - Thế giới thực biến thành game, ta sở hữu tài khoản Vương Giả - Manhua Thuyết Minh"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Grid>
                    <Grid item lg={3} md={3} xs={12} position="sticky">
                        <Grid container>
                            <Grid item lg={12} md={12} xs={3}>
                                <img
                                    style={{ width: '100%', height: 'auto', background: 'blue' }}
                                    src="https://fb88next.com/wp-content/uploads/2022/12/danh-gia-fb88.jpg"
                                />
                            </Grid>
                            <Grid item lg={12} md={12} xs={3}>
                                <img
                                    style={{ width: '100%', height: 'auto', background: 'blue' }}
                                    src="https://fb88next.com/wp-content/uploads/2022/12/danh-gia-fb88.jpg"
                                />
                            </Grid>
                            <Grid item lg={12} md={12} xs={3}>
                                <img
                                    style={{ width: '100%', height: 'auto', background: 'blue' }}
                                    src="https://fb88next.com/wp-content/uploads/2022/12/danh-gia-fb88.jpg"
                                />
                            </Grid>
                            <Grid item lg={12} md={12} xs={3}>
                                <img
                                    style={{ width: '100%', height: 'auto', background: 'blue' }}
                                    src="https://fb88next.com/wp-content/uploads/2022/12/danh-gia-fb88.jpg"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
