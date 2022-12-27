import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../../core/constants/common';
import { playlistsDetailActions } from '../../../core/redux/slice/playlists-detail-slice';
import { getPlaylistsData } from '../../../core/redux/slice/playlists-slice';
import { YoutubePlaylistsItem } from '../../../core/types/youtube-playlists';

export default function TitlebarImageList() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux]);

    const handleTargetYoutubeItem = (playlistsDetail: YoutubePlaylistsItem) => {
        dispatch(playlistsDetailActions.setPlaylistsDetail(playlistsDetail));
        navigate(UrlFeApp.CONTENT);
    };

    return youtubePlaylistsState && youtubePlaylistsState.items && youtubePlaylistsState.items.length > 0 ? (
        <ImageList sx={{ width: '100%', height: '100%' }}>
            {[...youtubePlaylistsState.items].reverse().map((item: YoutubePlaylistsItem) => (
                <Tooltip title={item.snippet.title} placement="top" key={item.id}>
                    <Button
                        sx={{ p: 0, m: 0, width: '100%' }}
                        className="shadow"
                        onClick={() => handleTargetYoutubeItem(item)}
                    >
                        <ImageListItem>
                            <img
                                src={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.snippet.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                className="text-start"
                                title={item.snippet.title}
                                subtitle={item.snippet.channelTitle}
                                actionIcon={
                                    <span
                                        style={{ color: 'rgba(255, 255, 255, 0.54)', marginRight: '10px' }}
                                        aria-label={`info about ${item.snippet.title}`}
                                    >
                                        <PlayCircleIcon />
                                    </span>
                                }
                            />
                        </ImageListItem>
                    </Button>
                </Tooltip>
            ))}
        </ImageList>
    ) : (
        <React.Fragment></React.Fragment>
    );
}
