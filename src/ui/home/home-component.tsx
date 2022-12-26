import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';
import CommentFacebook from '../facebook/comment-facebook-component';
import MainFeaturedPost from '../main-featured-post/main-featured-post';
import Main from '../main/main-component';
import Sidebar from '../side-bar/side-bar';

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
                        description: 'Description',
                        image: 'https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=',
                        imageText: 'imageText',
                        linkText: 'linkText',
                        title: 'title',
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
