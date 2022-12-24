import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { playlistsDetailActions } from '../../core/redux/slice/playlists-detail-slice';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';
import { YoutubePlaylistsItem } from '../../core/types/youtube-playlists';
import CommentFacebook from '../facebook/comment-facebook-component';

export default function Home() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux]);

    const handleClickLink = (playlistsDetail: YoutubePlaylistsItem) => {
        dispatch(playlistsDetailActions.setPlaylistsDetail(playlistsDetail));
        navigate(UrlFeApp.CONTENT);
    };

    return (
        <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
            <ul>
                {youtubePlaylistsState &&
                    youtubePlaylistsState.items &&
                    youtubePlaylistsState.items.length > 0 &&
                    youtubePlaylistsState.items.map((data: YoutubePlaylistsItem, index: number) => {
                        return (
                            <li key={data.id}>
                                {index + 1} -
                                <Button onClick={() => handleClickLink(data)} color="secondary">
                                    {data.snippet.title}
                                </Button>
                            </li>
                        );
                    })}
            </ul>
            <CommentFacebook currentHref={window.location.href} />
        </div>
    );
}
