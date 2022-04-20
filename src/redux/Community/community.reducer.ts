import { ResultState } from '@store/result-status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorParser } from '@utils/error-parser';
import { getLogs } from '@api/skillwallet.api';
import { fetchCommunity, fetchMembers, updatePartnersCommunity } from '@api/community.api';
import { createSelector } from 'reselect';
import { Community, CommunityRole } from '@api/community.model';

export const fetchLogs = createAsyncThunk('community/logs', async (address: string, { dispatch }) => {
  try {
    return await getLogs();
  } catch (error) {
    return ErrorParser(error, dispatch);
  }
});

export interface CommunityState {
  community: Community;
  members: any;
  activeRoleName: string;
  status: ResultState;
  logs: any[];
}

const initialState = {
  community: new Community(),
  members: null,
  logs: [],
  activeRole: null,
  status: ResultState.Idle,
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    resetCommunityState: () => initialState,
    communityUpdateState(state, action) {
      state.status = action.payload;
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
      .addCase(updatePartnersCommunity.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(updatePartnersCommunity.fulfilled, (state, action) => {
        state.community = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(updatePartnersCommunity.rejected, (state) => {
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

export const { communityUpdateState } = communitySlice.actions;

const generateSkills = (skills: any[] = []) =>
  [0, 1, 2, 3].map((_, i) => {
    const skill = skills[i];
    if (skill && 'name' in skill) {
      return skill;
    }
    return {
      name: '',
    };
  });

export const CommunityData = (state) => state.community.community as Community;

export const allRoles = createSelector(CommunityData, (c) => {
  return (c.properties?.skills?.roles || []).reduce((prev, curr) => {
    prev = [
      ...prev,
      {
        ...curr,
        skills: generateSkills(curr.skills),
      },
    ];
    return prev;
  }, []) as CommunityRole[];
});

export const getCommunityRoles = (isCoreTeam: boolean) =>
  createSelector(allRoles, (roles: CommunityRole[]): any[] => {
    return roles.filter((curr) => curr.isCoreTeamMember === isCoreTeam);
  });

export default communitySlice.reducer;
