import { configureStore } from '@reduxjs/toolkit';
import loginGoogleSlice from './login-google-slice';
import userInfoSlice from './user-slice';

export const store = configureStore({
    reducer: {
        user: userInfoSlice,
        googleLoginData: loginGoogleSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
