import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { YoutubePlaylists } from '../../types/youtube-playlists';
import { initialPlaylistsDataState } from '../../utils/ObjectUtils';

export const playlistsData = createSlice({
    name: 'playlistsData',
    initialState: initialPlaylistsDataState,
    reducers: {
        setPlaylistsData(state, action: PayloadAction<YoutubePlaylists>) {
            state.playlistsData = action.payload;
        },
    },
});

export const playlistsActions = playlistsData.actions;

export const getPlaylistsData = (state: any) => state.playlistsData.playlistsData;

export default playlistsData.reducer;
