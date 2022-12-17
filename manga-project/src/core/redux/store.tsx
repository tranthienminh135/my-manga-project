import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app-slice';
import loginGoogleSlice from './login-google-slice';
import userInfoSlice from './user-slice';

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userInfoSlice,
        googleLoginData: loginGoogleSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
