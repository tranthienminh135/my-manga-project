import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialLoadingFacebookState } from '../../utils/ObjectUtils';

export const loadingFacebook = createSlice({
    name: 'loadingFacebook',
    initialState: initialLoadingFacebookState,
    reducers: {
        setLoadingFacebook(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const loadingFacebookActions = loadingFacebook.actions;

export const getLoadingFacebook = (state: any) => state.loadingFacebook.isLoading;

export default loadingFacebook.reducer;
