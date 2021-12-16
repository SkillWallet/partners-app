import { ResultState } from '@store/result-status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorParser } from '@utils/error-parser';
import { getCommunityByCommunityAddress } from '@api/dito.api';
import { getLogs, getMembersByCommunityAddress } from '@api/skillwallet.api';
import { openSnackbar } from '@store/ui-reducer';
import { createSelector } from 'reselect';
import { ActionPayload } from '@store/action-payload';
import { updateAndSaveSkills } from '@api/smart-contracts.api';

export const fetchCommunity = createAsyncThunk('community', async (address: string, { dispatch }) => {
  try {
    return await getCommunityByCommunityAddress(address);
  } catch (error) {
    return ErrorParser(error, dispatch);
  }
});

export const fetchLogs = createAsyncThunk('community/logs', async (address: string, { dispatch }) => {
  try {
    return await getLogs();
  } catch (error) {
    return ErrorParser(error, dispatch);
  }
});

export const fetchMembers = createAsyncThunk('community/members', async (payload: any, { dispatch }) => {
  try {
    const { address, isCoreTeam } = payload;
    return await getMembersByCommunityAddress(address, isCoreTeam);
  } catch (error) {
    dispatch(openSnackbar({ message: 'Failed to load members!', severity: 'error' }));
    return error;
  }
});

export const updateCommunity = createAsyncThunk('community/update', async (payload: any, { dispatch }) => {
  try {
    const { editedRole, community } = payload;
    return await updateAndSaveSkills(editedRole, community);
  } catch (error) {
    dispatch(openSnackbar({ message: 'Failed to update community!', severity: 'error' }));
    return error;
  }
});

export interface CommunityState {
  community: any;
  members: any;
  activeRoleName: string;
  status: ResultState;
  roles: any[];
  logs: any[];
}

const initialState = {
  community: null,
  members: null,
  roles: [],
  logs: [],
  activeRole: null,
  status: ResultState.Idle,
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    resetCommunityState: () => initialState,
    setActiveRole(state, action: ActionPayload<any>) {
      const role = state.roles.find((r) => r.roleName === action.payload);
      state.activeRole = role;
    },
    toggleActiveRoleSkill(state, action: ActionPayload<any>) {
      const index = state.activeRole.skills.findIndex((skill) => skill === action.payload);
      if (index === -1) {
        state.activeRole.skills = [...state.activeRole.skills, action.payload];
      } else {
        state.activeRole.skills.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // get community
      .addCase(fetchCommunity.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.community = action.payload;
        const roles = action.payload?.roles?.roles || [];
        state.roles = roles.reduce((prev, curr) => {
          prev = [
            ...prev,
            {
              credits: curr.credits,
              isCoreTeamMember: curr.isCoreTeamMember,
              roleName: curr.roleName,
              skills: curr.skills,
            },
          ];
          return prev;
        }, []);
        state.status = ResultState.Idle;
      })
      .addCase(fetchCommunity.rejected, (state) => {
        state.status = ResultState.Failed;
      })
      // get community members
      .addCase(fetchMembers.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(fetchMembers.rejected, (state) => {
        state.status = ResultState.Failed;
        state.members = {};
      })
      // update community
      .addCase(updateCommunity.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(updateCommunity.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(updateCommunity.rejected, (state) => {
        state.status = ResultState.Failed;
      })
      // update community logs
      .addCase(fetchLogs.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs = action.payload as any[];
        // state.status = ResultState.Idle;
      })
      .addCase(fetchLogs.rejected, (state) => {
        // state.status = ResultState.Failed;
        state.logs = [];
      });
  },
});

export const { setActiveRole, toggleActiveRoleSkill } = communitySlice.actions;

const communityRoles = (state) => state.community?.roles;

export const getCommunityRoles = (isCoreTeam: boolean) =>
  createSelector(communityRoles, (roles: any[]): any[] => {
    return roles.filter((curr) => curr.isCoreTeamMember !== isCoreTeam);
  });

export default communitySlice.reducer;
