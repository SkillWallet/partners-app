import { ResultState } from '@partners-store/status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorParser } from '@partners-utils/error-parser';
import { getMembersByCommunityAddress } from '@partners-api/api';

export interface MembersState {
  members: any;
  status: ResultState;
}

export const fetchMembers = createAsyncThunk('members', async (address: string, { dispatch }) => {
  try {
    return await getMembersByCommunityAddress(address);
  } catch (error) {
    return ErrorParser(error, dispatch);
  }
});

const initialState: MembersState = {
  members: null,
  status: ResultState.Idle,
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    resetMembersState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload as any;
        state.status = ResultState.Idle;
      })
      .addCase(fetchMembers.rejected, (state) => {
        state.status = ResultState.Failed;
      });
  },
});

export default membersSlice.reducer;
