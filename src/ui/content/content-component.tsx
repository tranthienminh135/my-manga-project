import { Container, Grid } from '@mui/material';
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
            <Container maxWidth="lg" className="border">
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
                <Grid container sx={{ mt: 3 }}>
                    {playlistItemsState && (
                        <MainContent key={status} status={status} playlistItems={playlistItemsState} />
                    )}
                    <Sidebar archives={youtubePlaylistsState ? youtubePlaylistsState.items : []} />
                </Grid>
                {`${window.location.href}/${playlistsDetailState.id}`}
                <Grid container sx={{ mt: 3 }}>
                    <CommentFacebook currentHref={`${window.location.href}/${playlistsDetailState.id}`} />
                </Grid>
            </Container>
        </div>
    );
}
