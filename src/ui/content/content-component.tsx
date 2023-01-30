import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { getPlaylistItemsData } from '../../core/redux/slice/playlist-items-slice';
import { getPlaylistsDetail } from '../../core/redux/slice/playlists-detail-slice';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';
import { YoutubePlaylistItems, YoutubePlaylistItemsItems } from '../../core/types/youtube-playlist-items';
import { YoutubePlaylistsItem } from '../../core/types/youtube-playlists';
import { initialPlaylistsDetailState } from '../../core/utils/ObjectUtils';
import BottomAds from '../ads/bottom-ads';
import LeftAds from '../ads/left-ads';
import RightAds from '../ads/right-ads';
import TopAds from '../ads/top-ads';
import CommentFacebook from '../facebook/comment-facebook-component';
import FeaturedPost from '../featured-post/featured-post';
import MainContent from '../main/content/main-content';
import Sidebar from '../side-bar/side-bar';

export default function Content() {
    const playlistDetailRedux = useSelector(getPlaylistsDetail);
    const [playlistsDetailState, setPlaylistsDetailState] = useState<YoutubePlaylistsItem>(
        initialPlaylistsDetailState.playlistDetail,
    );
    const playlistItemsRedux = useSelector(getPlaylistItemsData);
    const [playlistItemsReference, setPlaylistItemsReference] = useState<Array<YoutubePlaylistItems>>();
    const [playlistItemsState, setPlaylistItemsState] = useState<YoutubePlaylistItems>();
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux]);
    const navigate = useNavigate();

    useEffect(() => {
        if (playlistItemsReference && playlistItemsReference.length > 0) {
            for (let i = 0; i < playlistItemsReference.length; i++) {
                const playListItem: YoutubePlaylistItems = playlistItemsReference[i];
                if (playListItem && playListItem.items.length > 0) {
                    for (let j = 0; j < playListItem.items.length; j++) {
                        const item: YoutubePlaylistItemsItems = playListItem.items[j];
                        if (item.snippet.playlistId === playlistsDetailState.id) {
                            setPlaylistItemsState(playListItem);
                        }
                    }
                }
            }
        }
    }, [playlistItemsReference, playlistsDetailState]);

    useEffect(() => {
        if (playlistItemsRedux && playlistItemsRedux.length > 0) {
            setPlaylistItemsReference(playlistItemsRedux);
        }
    }, [playlistItemsRedux]);

    useEffect(() => {
        if (playlistDetailRedux.contentDetails.itemCount <= 0) {
            navigate(UrlFeApp.HOME);
        }

        if (playlistDetailRedux) {
            setPlaylistsDetailState(playlistDetailRedux);
        }
    }, [playlistDetailRedux, navigate]);

    const handleClickVideo = (status: string) => {
        setStatus(status);
    };

    return (
        <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
            <Grid container spacing={3} className="p-0">
                <Grid item md={12} lg={2} className="d-none d-xl-block">
                    <LeftAds />
                </Grid>
                <Grid item md={12} lg={8} className="border p-3">
                    <FeaturedPost
                        post={{
                            date: playlistsDetailState.snippet.publishedAt,
                            description: playlistsDetailState.snippet.description,
                            image: playlistsDetailState.snippet.thumbnails.standard.url,
                            imageLabel: '',
                            title: playlistsDetailState.snippet.title,
                            author: playlistsDetailState.snippet.channelTitle,
                            channelId: playlistsDetailState.snippet.channelId,
                        }}
                        callBackFn={handleClickVideo}
                    />
                    <Grid container sx={{ mt: 3 }} className="p-3 d-block d-xl-none">
                        <TopAds />
                    </Grid>
                    <Grid container sx={{ mt: 3 }} className="p-3">
                        {playlistItemsState && (
                            <MainContent key={status} status={status} playlistItems={playlistItemsState} />
                        )}
                        <Sidebar archives={youtubePlaylistsState ? youtubePlaylistsState.items : []} />
                    </Grid>
                    <Grid container sx={{ mt: 3 }} className="p-3 d-block d-xl-none">
                        <BottomAds />
                    </Grid>
                    <Grid container sx={{ mt: 3 }} className="ps-2">
                        <CommentFacebook currentHref={`${window.location.href}/${playlistsDetailState.id}`} />
                    </Grid>
                </Grid>
                <Grid item md={12} lg={2} className="d-none d-xl-block">
                    <RightAds />
                </Grid>
            </Grid>
        </div>
    );
}
