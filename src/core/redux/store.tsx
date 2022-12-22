import { configureStore } from '@reduxjs/toolkit';
import loginGoogleSlice from './slice/login-google-slice';
import playlistItemsSlice from './slice/playlist-items-slice';
import playlistsSlice from './slice/playlists-slice';
import userSlice from './slice/user-slice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        googleLoginData: loginGoogleSlice,
        playlistsData: playlistsSlice,
        playlistItemsData: playlistItemsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
