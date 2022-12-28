import { configureStore } from '@reduxjs/toolkit';
import channelIdSlice from './slice/playlists-detail-slice';
import loginGoogleSlice from './slice/login-google-slice';
import playlistItemsSlice from './slice/playlist-items-slice';
import playlistsSlice from './slice/playlists-slice';
import userSlice from './slice/user-slice';
import playlistItemDetailSlice from './slice/playlist-item-detail-slice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        googleLoginData: loginGoogleSlice,
        playlistsData: playlistsSlice,
        playlistItemsData: playlistItemsSlice,
        playlistsDetail: channelIdSlice,
        playlistItemDetail: playlistItemDetailSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
