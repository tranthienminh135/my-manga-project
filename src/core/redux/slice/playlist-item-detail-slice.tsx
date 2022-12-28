import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { YoutubePlaylistItemsItems } from '../../types/youtube-playlist-items';
import { initialPlaylistItemDetailState } from '../../utils/ObjectUtils';

export const playlistItemDetail = createSlice({
    name: 'playlistItemDetail',
    initialState: initialPlaylistItemDetailState,
    reducers: {
        setPlaylistItemDetail(state, action: PayloadAction<YoutubePlaylistItemsItems>) {
            state.playlistItemDetail = action.payload;
        },
    },
});

export const playlistItemDetailActions = playlistItemDetail.actions;

export const getPlaylistItemDetail = (state: any) => state.playlistItemDetail.playlistItemDetail;

export default playlistItemDetail.reducer;
