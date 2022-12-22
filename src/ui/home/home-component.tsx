import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlaylistItemsData } from '../../core/redux/slice/playlist-items-slice';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';

export default function Home() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const youtubePlaylistItemRedux = useSelector(getPlaylistItemsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();
    const [youtubePlaylistItemState, setYoutubePlaylistItemState] = useState<any>();

    useEffect(() => {
        if (youtubePlaylistsState && youtubePlaylistItemState) {
            // console.log({ youtubePlaylistsState, youtubePlaylistItemState });
        }
    }, [youtubePlaylistsState, youtubePlaylistItemState]);

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
            if (youtubePlaylistItemRedux && youtubePlaylistItemRedux.length > 0) {
                setYoutubePlaylistItemState(youtubePlaylistItemRedux);
            }
        }
    }, [youtubePlaylistsRedux, youtubePlaylistItemRedux]);

    const handleClickLink = (channelId: string) => {
        console.log(channelId);
    };

    return (
        <div style={{ overflow: 'auto', height: '500px' }} className="border">
            <ul>
                {youtubePlaylistsState &&
                    youtubePlaylistsState.items &&
                    youtubePlaylistsState.items.length > 0 &&
                    youtubePlaylistsState.items.map((data: any, index: number) => {
                        return (
                            <li key={data.id}>
                                {index + 1} -{' '}
                                <Button onClick={() => handleClickLink(data.id)} color="secondary">
                                    {data.snippet.title}
                                </Button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
