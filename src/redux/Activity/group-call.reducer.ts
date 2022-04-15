import { addGroupCall } from '@api/activities.api';
import { createSlice } from '@reduxjs/toolkit';
import { ResultState } from '@store/result-status';

export interface ActivityTaskState {
  status: ResultState;
  errorMessage: string;
  callData: {
    startDate: Date;
    startTime: string;
    duration: string;
    forCoreTeamRoles: boolean;
    allParticipants: boolean;
    participants: number;
    role: number;
  };
}

const initialState: ActivityTaskState = {
  status: ResultState.Idle,
  errorMessage: '',
  callData: {
    forCoreTeamRoles: null,
    allParticipants: null,
    startDate: null,
    startTime: null,
    duration: null,
    participants: null,
    role: null,
  },
};

export const activityGroupCallSlice = createSlice({
  name: 'groupCall',
  initialState,
  reducers: {
    activityUpdateGroupCallData(state, action) {
      state.callData = {
        ...state.callData,
        ...action.payload,
      };
    },
    activityUpdateGroupCallStatus(state, action) {
      state.status = action.payload;
    },
    resetActivityGroupCall: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGroupCall.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addGroupCall.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addGroupCall.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { activityUpdateGroupCallStatus, resetActivityGroupCall, activityUpdateGroupCallData } = activityGroupCallSlice.actions;

export const ActivityGroupCallStatus = (state: any) => state.groupCall.status as ResultState;
export const ActivityGroupCallError = (state: any) => state.groupCall.errorMessage as string;
export const ActivityGroupCallData = (state: any) => state.groupCall.callData as typeof initialState.callData;

export default activityGroupCallSlice.reducer;
