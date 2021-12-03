import { ResultState } from '@partners-store/status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorParser } from '@partners-utils/error-parser';
import { getCommunity } from '@partners-api/api';

export interface CommunityState {
  community: any;
  status: ResultState;
}

export const fetchCommunity = createAsyncThunk('community', async (address: string, { dispatch }) => {
  try {
    return await getCommunity(address);
  } catch (error) {
    return ErrorParser(error, dispatch);
  }
});

const initialState: CommunityState = {
  community: null,
  status: ResultState.Idle,
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    resetCommunityState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunity.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.community = action.payload as any;
        state.status = ResultState.Idle;
      })
      .addCase(fetchCommunity.rejected, (state) => {
        state.status = ResultState.Failed;
      });
  },
});

export default communitySlice.reducer;
