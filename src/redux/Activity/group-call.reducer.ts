import { addActivityTask } from '@api/activities.api';
import { createSlice } from '@reduxjs/toolkit';
import { CurrentStep } from '@store/model';
import { ResultState } from '@store/result-status';

export interface ActivityTaskState {
  status: ResultState;
  callData: {
    startDate: Date;
    startTime: string;
  };
}

const initialState: ActivityTaskState = {
  status: ResultState.Idle,
  callData: {
    startDate: null,
    startTime: null,
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
      .addCase(addActivityTask.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addActivityTask.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addActivityTask.rejected, (state) => {
        state.status = ResultState.Failed;
      });
  },
});

export const { activityUpdateGroupCallStatus, resetActivityGroupCall, activityUpdateGroupCallData } = activityGroupCallSlice.actions;

export const ActivityGroupCallStatus = (state: any) => state.groupCall.status as ResultState;
export const ActivityGroupCallData = (state: any) => state.groupCall.callData as typeof initialState.callData;

export default activityGroupCallSlice.reducer;
