import { addActivityTask } from '@api/smart-contracts.api';
import { createSlice } from '@reduxjs/toolkit';
import { CurrentStep } from '@store/model';
import { ResultState } from '@store/result-status';

export interface ActivityTaskState {
  currentStep: CurrentStep;
  status: ResultState;
  taskInfo: {
    description: string;
    isCoreTeamMembersOnly: boolean;
    allParticipants: boolean;
    role: string;
    participants: number;
    title: string;
  };
}

const initialState: ActivityTaskState = {
  status: ResultState.Idle,
  currentStep: {} as CurrentStep,
  taskInfo: {
    description: null,
    isCoreTeamMembersOnly: true,
    allParticipants: false,
    participants: 1,
    role: null,
    title: '',
  },
};

export const activityTaskSlice = createSlice({
  name: 'activityTask',
  initialState,
  reducers: {
    activitySetCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    activityUpdateTask(state, action) {
      state.taskInfo = {
        ...state.taskInfo,
        ...action.payload,
      };
    },
    activityUpdateTaskStatus(state, action) {
      state.status = action.payload;
    },
    resetActivityTaskState: () => initialState,
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

export const { activityUpdateTaskStatus, resetActivityTaskState, activityUpdateTask, activitySetCurrentStep } = activityTaskSlice.actions;

export const ActivityCurrentStep = (state: any) => state.activityTask.currentStep as CurrentStep;
export const ActivityStatus = (state: any) => state.activityTask.status as ResultState;
export const ActivityCurrentTask = (state: any) => state.activityTask.taskInfo as typeof initialState.taskInfo;

export default activityTaskSlice.reducer;
