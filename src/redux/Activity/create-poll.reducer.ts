import { addPoll } from '@api/activities.api';
import { createSlice } from '@reduxjs/toolkit';
import { ResultState } from '@store/result-status';

export interface CreatePollState {
  status: ResultState;
  errorMessage: string;
  pollData: {
    title: string;
    description: string;
    options: any[];
    duration: string;
    role: string;
    allRoles: boolean;
  };
}

const initialState: CreatePollState = {
  status: ResultState.Idle,
  errorMessage: '',
  pollData: {
    title: '',
    description: '',
    duration: '',
    options: [
      {
        option: '',
        emoji: null,
      },
      {
        option: '',
        emoji: null,
      },
    ],
    role: null,
    allRoles: null,
  },
};

export const createPollSlice = createSlice({
  name: 'createPoll',
  initialState,
  reducers: {
    pollUpdateData(state, action) {
      state.pollData = {
        ...state.pollData,
        ...action.payload,
      };
    },
    createPollUpdateStatus(state, action) {
      state.status = action.payload;
    },
    resetCreatePollState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPoll.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addPoll.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addPoll.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { pollUpdateData, createPollUpdateStatus, resetCreatePollState } = createPollSlice.actions;

export const CreatePollStatus = (state: any) => state.createPoll.status as ResultState;
export const CreatePollError = (state: any) => state.createPoll.errorMessage as string;
export const CreatePollData = (state: any) => state.createPoll.pollData as typeof initialState.pollData;

export default createPollSlice.reducer;
