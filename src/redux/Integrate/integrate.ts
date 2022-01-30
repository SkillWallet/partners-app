import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CommunityIntegration, CommunityRole } from '@api/api.model';
import { ResultState } from '@store/result-status';
import { openSnackbar } from '@store/ui-reducer';
import { ParseSWErrorMessage } from 'sw-web-shared';
import { createPartnersAgreement } from '@api/smart-contracts.api';
import { partnerAgreementAccess } from '@api/skillwallet.api';
import { environment } from '@api/environment';

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
  agreement: {
    key: string;
    communityAddr: string;
    partnersAddr: string;
  };
  isValidKey: boolean;
  agreementKey: string;
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
};

export const integratePartnerAgreement = createAsyncThunk(
  'integrate/partner-agreement/create',
  async (
    requestBody: { metadata: CommunityIntegration; numOfActions: number; contractAddress: string; selectedTemplate: number },
    { dispatch, getState, signal }
  ) => {
    try {
      const { metadata, numOfActions, contractAddress, selectedTemplate } = requestBody;
      return createPartnersAgreement(
        environment.communityRegistryAddress,
        environment.partnersRegistryAdress,
        metadata,
        numOfActions,
        contractAddress,
        selectedTemplate
      );
    } catch (error) {
      const message = ParseSWErrorMessage(error);
      dispatch(openSnackbar({ message, severity: 'error' }));
      throw new Error(message);
    }
  }
);

export const validatePartnerAgreementKey = createAsyncThunk(
  'integrate/partner-agreement/validate-key',
  async (key: string, { dispatch }) => {
    try {
      const isKeyValid = await partnerAgreementAccess(key);
      if (isKeyValid) {
        dispatch(openSnackbar({ message: 'Valid Key', severity: 'success' }));
      }
      return Promise.resolve(isKeyValid);
    } catch (error) {
      const message = ParseSWErrorMessage(error);
      dispatch(openSnackbar({ message, severity: 'error' }));
      throw new Error(message);
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
      .addCase(integratePartnerAgreement.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(integratePartnerAgreement.fulfilled, (state, action) => {
        state.status = ResultState.Success;
        console.log(action, 'action');
        state.agreement = action.payload;
      })
      .addCase(integratePartnerAgreement.rejected, (state) => {
        state.status = ResultState.Failed;
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
export const IntegrateKeyStatus = (state: any) => state.integrate.keyStatus as ResultState;
export const IntegrateAgreement = (state: any) => state.integrate.agreement as any;
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
