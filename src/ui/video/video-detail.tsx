import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { getPlaylistItemDetail } from '../../core/redux/slice/playlist-item-detail-slice';
import { YoutubePlaylistItemsItems } from '../../core/types/youtube-playlist-items';
import { initialPlaylistItemDetailState } from '../../core/utils/ObjectUtils';
import CommentFacebook from '../facebook/comment-facebook-component';

export default function VideoDetail() {
    const playlistItemDetailRedux = useSelector(getPlaylistItemDetail);
    const [playlistItemDetailState, setPlaylistItemDetailState] = useState<YoutubePlaylistItemsItems>(
        initialPlaylistItemDetailState.playlistItemDetail,
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (playlistItemDetailRedux.id !== '') {
            setPlaylistItemDetailState(playlistItemDetailRedux);
        } else {
            navigate(UrlFeApp.HOME);
        }
    }, [playlistItemDetailRedux, navigate]);

    return (
        <>
            <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
                <Container maxWidth="lg" className="border">
                    <Grid container sx={{ mt: 3 }}>
                        <Grid xs={12}>
                            <iframe
                                width="100%"
                                height={window.innerHeight - 300}
                                src={`https://www.youtube.com/embed/${playlistItemDetailState.snippet.resourceId.videoId}`}
                                title={playlistItemDetailState.snippet.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </Grid>
                        <Grid xs={12}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<FirstPageIcon fontSize="small" />}
                                    color="secondary"
                                    className="m-auto"
                                >
                                    Tập trước
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<LastPageIcon fontSize="small" />}
                                    color="warning"
                                    className="m-auto"
                                >
                                    Tập sau
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        {<CommentFacebook currentHref={window.location.href} />}
                    </Grid>
                </Container>
            </div>
        </>
    );
}
