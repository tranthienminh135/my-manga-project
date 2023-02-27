import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Background from '../../assets/background.png';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';
import BottomAds from '../ads/bottom-ads';
import LeftAds from '../ads/left-ads';
import RightAds from '../ads/right-ads';
import TopAds from '../ads/top-ads';
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
            <Grid container spacing={3}>
                <Grid item md={12} lg={2} className="d-none d-xl-block">
                    <LeftAds />
                </Grid>
                <Grid item md={12} lg={8} className="border">
                    <MainFeaturedPost
                        post={{
                            description: 'Truyện tranh siêu cấp hệ thống',
                            image: Background,
                            imageText: 'imageText',
                            linkText: 'Xem thêm',
                            title: 'Trần Thiên Minh',
                        }}
                    />
                    <Grid container sx={{ mt: 3 }} className="d-block d-xl-none">
                        <TopAds />
                        <script
                            async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6178539232489042"
                            crossOrigin="anonymous"
                        ></script>
                        <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-6178539232489042"
                            data-ad-slot="2626674470"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Main />
                        <Sidebar archives={youtubePlaylistsState ? youtubePlaylistsState.items : []} />
                    </Grid>
                    <Grid container sx={{ mt: 3 }} className=" d-block d-xl-none">
                        <BottomAds />
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <CommentFacebook currentHref={window.location.href} />
                    </Grid>
                </Grid>
                <Grid item md={12} lg={2} className="d-none d-xl-block">
                    <RightAds />
                </Grid>
            </Grid>
        </div>
    );
}
