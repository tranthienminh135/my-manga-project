import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';
import CommentFacebook from '../facebook/comment-facebook-component';
import MainFeaturedPost from '../main-featured-post/main-featured-post';
import Main from '../main/main-component';
import Sidebar from '../side-bar/side-bar';
import Background from '../../assets/background.png';

export default function Home() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux]);

    return (
        <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
            <Container maxWidth="lg" className="border">
                <MainFeaturedPost
                    post={{
                        description: 'Thiên Minh Manhua truyện tranh siêu cấp hệ thống',
                        image: Background,
                        imageText: 'imageText',
                        linkText: 'Xem thêm',
                        title: 'Thiên Minh Manhua',
                    }}
                />
                <Grid container sx={{ mt: 3 }}>
                    <Main />
                    <Sidebar archives={youtubePlaylistsState ? youtubePlaylistsState.items : []} />
                </Grid>
                <Grid container sx={{ mt: 3 }}>
                    <CommentFacebook currentHref={window.location.href} />
                </Grid>
            </Container>
        </div>
    );
}
