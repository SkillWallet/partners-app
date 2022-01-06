import { getPartnersAgreementByCommunity } from '@api/dito.api';
import { createActivityTask } from '@api/smart-contracts.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResultState } from '@store/result-status';
import { openSnackbar } from '@store/ui-reducer';
import { ParseSWErrorMessage } from 'sw-web-shared';

export interface ActivityTaskState {
  currentStep: {
    activeStep: number;
    title: string;
    description: string;
    toPrevBtnPath: string;
    stepperText: string;
    descriptionTooltip: string;
  };
  description: string;
  isCoreTeamMembersOnly: boolean;
  allParticipants: boolean;
  role: string;
  participants: number;
  status: ResultState;
}

const initialState: ActivityTaskState = {
  currentStep: {} as any,
  description: null,
  isCoreTeamMembersOnly: false,
  allParticipants: false,
  participants: 1,
  role: null,
  status: ResultState.Idle,
};

export const addActivityTask = createAsyncThunk('event-factory/acivity-task/create', async (task: any, { dispatch, getState }) => {
  try {
    const { community, auth }: any = getState();
    const { userInfo } = auth;
    const { role, isCoreTeamMembersOnly, allParticipants, participants, description } = task;
    const partner = await getPartnersAgreementByCommunity(community.community.address);
    const selectedRole = community.roles.find(({ roleName }) => roleName === role);

    return createActivityTask(partner?.partnersAgreementAddress, {
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
    activityTaskSetCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    activityTaskUpdateDescription(state, action) {
      state.description = action.payload;
    },
    activityTaskUpdateStatus(state, action) {
      state.status = action.payload;
    },
    activityTaskUpdateParticipants(state, action) {
      state.participants = action.payload;
    },
    activityTaskToggleForCoreTeamMembers(state, action) {
      if (state.isCoreTeamMembersOnly !== action.payload) {
        // reset role when category changes
        state.role = null;
      }
      state.isCoreTeamMembersOnly = action.payload;
    },
    activityTaskToggleAllParticipants(state, action) {
      state.allParticipants = action.payload;
    },
    activityTaskSelectRole(state, action) {
      state.role = action.payload;
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

export const {
  activityTaskToggleForCoreTeamMembers,
  activityTaskUpdateParticipants,
  activityTaskUpdateStatus,
  activityTaskToggleAllParticipants,
  resetActivityTaskState,
  activityTaskUpdateDescription,
  activityTaskSetCurrentStep,
  activityTaskSelectRole,
} = activityTaskSlice.actions;

export default activityTaskSlice.reducer;
