import axios from 'axios';
import { createActivityTask } from '@api/smart-contracts.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CurrentStep } from '@store/model';
import { ResultState } from '@store/result-status';
import { openSnackbar } from '@store/ui-reducer';
import { ParseSWErrorMessage } from 'sw-web-shared';

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

export const addActivityTask = createAsyncThunk('event-factory/acivity-task/create', async (task: any, { dispatch, getState }) => {
  try {
    const { community, auth, partner }: any = getState();
    const { userInfo } = auth;
    const { role, isCoreTeamMembersOnly, allParticipants, participants, description, title } = task;
    const selectedRole = community.roles.find(({ roleName }) => roleName === role);

    const result = await axios.get(community.community.image, {
      responseType: 'blob',
    });
    return createActivityTask(partner?.paCommunity?.partnersAgreementAddress, {
      name: 'SkillWallet Task',
      description: community.community.description,
      image: community.community.image,
      properties: {
        creator: userInfo.nickname,
        creatorSkillWalletId: window.ethereum.selectedAddress,
        role: selectedRole,
        roleId: role,
        participants,
        allParticipants,
        description,
        title,
        isCoreTeamMembersOnly,
      },
    });
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

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
