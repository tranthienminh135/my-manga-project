import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { getPlaylistItemsData } from '../../core/redux/slice/playlist-items-slice';
import { getPlaylistsDetail } from '../../core/redux/slice/playlists-detail-slice';
import { YoutubePlaylistItems, YoutubePlaylistItemsItems } from '../../core/types/youtube-playlist-items';
import { YoutubePlaylistsItem } from '../../core/types/youtube-playlists';
import { initialPlaylistsDetailState } from '../../core/utils/ObjectUtils';

export default function Content() {
    const playlistDetailRedux = useSelector(getPlaylistsDetail);
    const [playlistsDetailState, setPlaylistsDetailState] = useState<YoutubePlaylistsItem>(
        initialPlaylistsDetailState.playlistDetail,
    );
    const playlistItemsRedux = useSelector(getPlaylistItemsData);
    const [playlistItemsReference, setPlaylistItemsReference] = useState<Array<YoutubePlaylistItems>>();
    const [playlistItemsState, setPlaylistItemsState] = useState<YoutubePlaylistItems>();
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

    return (
        <div style={{ overflow: 'auto', height: '500px' }} className="border">
            <p>
                {playlistsDetailState.snippet.title} {playlistsDetailState.snippet.channelTitle}
            </p>
            <ul>
                {playlistItemsState &&
                    playlistItemsState.items &&
                    playlistItemsState.items.length > 0 &&
                    playlistItemsState.items.map((item: YoutubePlaylistItemsItems) => (
                        <li key={item.id}>{item.snippet.title}</li>
                    ))}
            </ul>
        </div>
    );
}
