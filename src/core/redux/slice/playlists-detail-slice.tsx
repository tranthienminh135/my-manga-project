import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { YoutubePlaylistsItem } from '../../types/youtube-playlists';
import { initialPlaylistsDetailState } from '../../utils/ObjectUtils';

export const playlistsDetail = createSlice({
    name: 'playlistsDetail',
    initialState: initialPlaylistsDetailState,
    reducers: {
        setPlaylistsDetail(state, action: PayloadAction<YoutubePlaylistsItem>) {
            state.playlistDetail = action.payload;
        },
    },
});

export const playlistsDetailActions = playlistsDetail.actions;

export const getPlaylistsDetail = (state: any) => state.playlistsDetail.playlistDetail;

export default playlistsDetail.reducer;
