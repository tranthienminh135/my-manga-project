import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { UrlFeApp } from '../../core/constants/common';
import { playlistsDetailActions } from '../../core/redux/slice/playlists-detail-slice';
import { YoutubePlaylistsItem } from '../../core/types/youtube-playlists';

interface SidebarProps {
    archives: ReadonlyArray<YoutubePlaylistsItem>;
}

export default function Sidebar(props: SidebarProps) {
    const { archives } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTargetYoutubeItem = (playlistsDetail: YoutubePlaylistsItem) => {
        dispatch(playlistsDetailActions.setPlaylistsDetail(playlistsDetail));
        navigate(UrlFeApp.CONTENT);
    };

    return (
        <Grid item xs={12} md={4} sx={{ padding: '12px', paddingTop: '0px !important' }}>
            <div style={{ maxHeight: '1515px' }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                    <Typography variant="h6" gutterBottom>
                        Giới thiệu
                    </Typography>
                    <Typography>Giới thiệu</Typography>
                </Paper>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Mới nhất
                </Typography>
                <div className="w-100">
                    {archives.map((archive: YoutubePlaylistsItem, index: number) => {
                        if (index <= 4) {
                            return (
                                <Button
                                    size="small"
                                    className="d-flex m-2 w-100 border border-2 shadow"
                                    onClick={() => handleTargetYoutubeItem(archive)}
                                    key={archive.id}
                                >
                                    <img
                                        src={archive.snippet.thumbnails.default.url}
                                        alt={archive.snippet.title}
                                        className="d-inline-block  rounded"
                                        loading="lazy"
                                    />
                                    <span className="d-inline-block text-start w-100 p-2" key={archive.id}>
                                        {archive.snippet.title}
                                    </span>
                                </Button>
                            );
                        } else return <div key={archive.id}></div>;
                    })}
                </div>

                <Divider />
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Liên hệ
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<FacebookIcon />}>
                        Facebook
                    </Button>
                    <Button variant="outlined" startIcon={<YouTubeIcon />}>
                        Youtube
                    </Button>
                </Stack>
            </div>
        </Grid>
    );
}
