import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseGoogleLogin } from '../types/base';
import { initialGoogleLoginDataState } from '../utils/ObjectUtils';

export const googleLoginData = createSlice({
    name: 'googleLoginData',
    initialState: initialGoogleLoginDataState,
    reducers: {
        setGoogleLoginData(state, action: PayloadAction<ResponseGoogleLogin>) {
            state.responseGoogle = action.payload;
        },
    },
});

export const googleLoginActions = googleLoginData.actions;

export const getGoogleLoginData = (state: any) => state.googleLoginData.responseGoogle;

export default googleLoginData.reducer;
