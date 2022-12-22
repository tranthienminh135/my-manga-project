import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { YoutubePlaylistItems } from '../../types/youtube-playlist-items';
import { initialPlaylistItemsDataState } from '../../utils/ObjectUtils';

export const playlistItemsData = createSlice({
    name: 'playlistItemsData',
    initialState: initialPlaylistItemsDataState,
    reducers: {
        setPlaylistItemsData(state, action: PayloadAction<Array<YoutubePlaylistItems>>) {
            state.playlistItemsData = action.payload;
        },
    },
});

export const playlistItemsActions = playlistItemsData.actions;

export const getPlaylistItemsData = (state: any) => state.playlistItemsData.playlistItemsData;

export default playlistItemsData.reducer;
