import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlaylistsData } from '../../../core/redux/slice/playlists-slice';
import { YoutubePlaylistsItem } from '../../../core/types/youtube-playlists';

export default function TitlebarImageList() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux]);

    return youtubePlaylistsState && youtubePlaylistsState.items && youtubePlaylistsState.items.length > 0 ? (
        <ImageList sx={{ width: '100%', height: '100%' }}>
            {youtubePlaylistsState.items.map((item: YoutubePlaylistsItem) => (
                <ImageListItem key={item.id}>
                    <img
                        src={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.snippet.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.snippet.title}
                        subtitle={item.snippet.channelTitle}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.snippet.title}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    ) : (
        <React.Fragment></React.Fragment>
    );
}
