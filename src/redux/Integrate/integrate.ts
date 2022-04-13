import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CommunityRole } from '@api/api.model';
import { ResultState } from '@store/result-status';
import { openSnackbar } from '@store/ui-reducer';
import { activatePaCommunity, partnerAgreementAccess } from '@api/skillwallet.api';
import { ParseSWErrorMessage } from '@utils/error-parser';
import { createPartnersCommunity, createPartnersAgreement } from '@api/registry.api';

export interface IntegrateTaskState {
  communityInfo: {
    name: string;
    avatar: string;
    description: string;
  };
  selectedTemplate: number;
  roles: string[];
  numOfActions: number;
  startFromScratch: boolean;
  importedContract: boolean;
  status: ResultState;
  keyStatus: ResultState;
  communityAddr: string;
  errorMessage: string;
  agreement: {
    key: string;
    communityAddr: string;
    partnersAddr: string;
  };
  isValidKey: boolean;
  agreementKey: string;
  isActivationSuccess: boolean;
  loadingMessage: string;
}

const initialState: IntegrateTaskState = {
  communityInfo: null,
  roles: [],
  selectedTemplate: null,
  numOfActions: 0,
  startFromScratch: true,
  importedContract: false,
  status: ResultState.Idle,
  keyStatus: ResultState.Idle,
  agreement: null,
  isValidKey: null,
  agreementKey: null,
  communityAddr: null,
  errorMessage: null,
  isActivationSuccess: false,
  loadingMessage: null,
};

export const validatePartnerAgreementKey = createAsyncThunk(
  'integrate/partner-agreement/validate-key',
  async (key: string, { dispatch, rejectWithValue }) => {
    try {
      const isKeyValid = await partnerAgreementAccess(key);
      if (isKeyValid) {
        dispatch(openSnackbar({ message: 'Valid Key', severity: 'success' }));
      }
      return Promise.resolve(isKeyValid);
    } catch (error) {
      const message = ParseSWErrorMessage(error);
      dispatch(openSnackbar({ message, severity: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const activatePartnersAgreement = createAsyncThunk(
  'integrate/partner-agreement/activate',
  async (requestBody: { communityAddr: string; partnersAddr: string; partnerKey: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      return await activatePaCommunity(requestBody);
    } catch (error) {
      const message = error;
      return rejectWithValue(message);
    }
  }
);

export const integrateSlice = createSlice({
  name: 'integrate',
  initialState,
  reducers: {
    integrateUpdateCommunityInfo(state, action) {
      state.communityInfo = action.payload;
    },
    integrateUpdateStatus(state, action) {
      state.status = action.payload;
    },
    integrateSelecteTemplate(state, action) {
      state.selectedTemplate = action.payload;
    },
    integrateSetAgreementKey(state, action) {
      state.agreementKey = action.payload;
    },
    integrateUpdateRolesAndAction(state, action) {
      const { roles, numOfActions } = action.payload;
      state.roles = roles;
      state.numOfActions = numOfActions;
    },
    integrateCommunityInfo(state, action) {
      state.communityInfo = action.payload;
    },
    integrateUpdateStartFromScratch(state, action) {
      state.startFromScratch = action.payload;
    },
    resetIntegrateState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPartnersCommunity.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(createPartnersCommunity.fulfilled, (state, action) => {
        state.status = ResultState.Success;
        state.communityAddr = action.payload;
      })
      .addCase(createPartnersCommunity.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })
      .addCase(createPartnersAgreement.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(createPartnersAgreement.fulfilled, (state, action) => {
        state.status = ResultState.Success;
        state.agreement = action.payload;
      })
      .addCase(createPartnersAgreement.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })
      .addCase(validatePartnerAgreementKey.pending, (state) => {
        state.keyStatus = ResultState.Loading;
      })
      .addCase(validatePartnerAgreementKey.fulfilled, (state, action) => {
        if (action.payload) {
          state.keyStatus = ResultState.Idle;
        } else {
          state.keyStatus = ResultState.Success;
        }
        state.isValidKey = action.payload;
      })
      .addCase(validatePartnerAgreementKey.rejected, (state) => {
        state.keyStatus = ResultState.Failed;
        state.isValidKey = false;
      })
      .addCase(activatePartnersAgreement.pending, (state) => {
        state.status = ResultState.Updating;
        state.loadingMessage = 'Initiating SkillWallet.';
      })
      .addCase(activatePartnersAgreement.fulfilled, (state, action) => {
        state.status = ResultState.Idle;
        state.loadingMessage = null;
        state.isActivationSuccess = true;
        // state.communityAddr = action.payload;
      })
      .addCase(activatePartnersAgreement.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.isActivationSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const {
  integrateUpdateStatus,
  integrateUpdateRolesAndAction,
  integrateSelecteTemplate,
  integrateSetAgreementKey,
  resetIntegrateState,
  integrateUpdateStartFromScratch,
  integrateCommunityInfo,
} = integrateSlice.actions;

const roles = (state) => state.integrate.roles;
export const IntegrateStatus = (state: any) => state.integrate.status as ResultState;
export const ActivationSucessful = (state: any) => state.integrate.isActivationSuccess as boolean;
export const IntegrateLoadingMessage = (state: any) => state.integrate.loadingMessage as boolean;
export const IntegrateErrorMessage = (state: any) => state.integrate.errorMessage as string;
export const IntegrateKeyStatus = (state: any) => state.integrate.keyStatus as ResultState;
export const IntegrateAgreement = (state: any) => state.integrate.agreement as any;
export const IntegrateAgreementCommunityAddr = (state: any) => state.integrate.communityAddr as string;
export const getRoles = createSelector(roles, (x1): CommunityRole[] => {
  const [role1, role2, role3] = x1;
  return [
    {
      credits: 24,
      roleName: role1?.value,
      skills: [],
      isCoreTeamMember: false,
    },
    {
      credits: 12,
      roleName: role2?.value,
      skills: [],
      isCoreTeamMember: false,
    },
    {
      credits: 6,
      roleName: role3?.value,
      skills: [],
      isCoreTeamMember: false,
    },
    {
      credits: 24,
      roleName: 'Core Team',
      skills: [],
      isCoreTeamMember: true,
    },
    {
      credits: 12,
      roleName: 'Advisor',
      skills: [],
      isCoreTeamMember: true,
    },
    {
      credits: 6,
      roleName: 'Investor',
      skills: [],
      isCoreTeamMember: true,
    },
  ];
});

export default integrateSlice.reducer;
