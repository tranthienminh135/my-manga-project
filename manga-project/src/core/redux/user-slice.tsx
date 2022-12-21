import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGoogleInfo } from '../types/user';
import { initialUserGoogleInfoState } from '../utils/ObjectUtils';

export const userInfoSlice = createSlice({
    name: 'user',
    initialState: initialUserGoogleInfoState,
    reducers: {
        setUserInfo(state, action: PayloadAction<UserGoogleInfo>) {
            state.userGoogleInfo = action.payload;
        },
    },
});

export const userActions = userInfoSlice.actions;

export const getUserGoogleInfo = (state: any) => state.user.userGoogleInfo;

export default userInfoSlice.reducer;
