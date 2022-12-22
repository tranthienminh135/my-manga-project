import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';

export default function Home() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux.items);
        }
    }, [youtubePlaylistsRedux]);

    return (
        <div>
            <ul>
                {youtubePlaylistsState &&
                    youtubePlaylistsState.length > 0 &&
                    youtubePlaylistsState.map((data: any) => {
                        return <li key={data.id}>{data.snippet.title}</li>;
                    })}
            </ul>
        </div>
    );
}
