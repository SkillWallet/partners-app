import { ResultState } from '@store/result-status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LockDatatableItems } from '@components/datatable/DatatableHelpers';
import { openSnackbar } from '@store/ui-reducer';
import { createSelector } from 'reselect';
import { getPartnersAgreementByCommunity } from '@api/dito.api';
import { getCoreTeamMemberNames, addCoreTeamName } from '@api/skillwallet.api';
import {
  getWhitelistedAddresses,
  addAddressToWhitelist,
  getImportedContracts,
  importContractToPA,
  getPAUrl,
  addUrlToPA,
} from '@api/smart-contracts.api';
import { ErrorParser, ParseSWErrorMessage } from '@utils/error-parser';

export const fetchPartnerWhitelistedAddresses = createAsyncThunk('partner/addresses', async (address: string, { dispatch, getState }) => {
  try {
    const whitelistedAddresses = (await getWhitelistedAddresses(address)) as [];
    const coreTeamMemberNames = await getCoreTeamMemberNames(address);
    const result = whitelistedAddresses.map((a) => ({
      address: a,
      name: coreTeamMemberNames.coreTeamMembers.find((c) => c.memberAddress === a)?.memberName || 'N/A',
    }));
    return {
      whitelistedAddresses: result,
    };
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const fetchPartnerContracts = createAsyncThunk('partner/contracts', async (_, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    const paCommunity = partner?.paCommunity;
    return await getImportedContracts(paCommunity?.partnersAgreementAddress);
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const fetchPaUrl = createAsyncThunk('partner/paUrl', async (_, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    const paCommunity = partner?.paCommunity;
    return await getPAUrl(paCommunity.partnersAgreementAddress);
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addPaUrl = createAsyncThunk('partner/add/paUrl', async (daoUrl: string, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    const paCommunity = partner?.paCommunity;
    await addUrlToPA(paCommunity.partnersAgreementAddress, daoUrl);
    return dispatch(fetchPaUrl());
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addRemoveContracts = createAsyncThunk('partner/contracs/addRemove', async (payload: any, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    const address = partner?.paCommunity?.partnersAgreementAddress;

    const { newItems, removedItems } = payload;
    for (const item of newItems) {
      await importContractToPA(address, item.address);
    }
    for (const item of removedItems) {
      // await asyncCall(item);
    }
    return dispatch(fetchPartnerContracts());
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addNewWhitelistedAddresses = createAsyncThunk('partner/addresses/add', async (newMembers: any[], { dispatch, getState }) => {
  try {
    const {
      auth: { userInfo },
    }: any = getState();
    for (const newMember of newMembers) {
      await addAddressToWhitelist(userInfo?.community, newMember.address);
      await addCoreTeamName(userInfo.community, newMember.address, newMember.name);
    }
    return dispatch(fetchPartnerWhitelistedAddresses(userInfo?.community));
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const fetchPartnersAgreementByCommunity = createAsyncThunk('partner/agreement/community', async (address: string, { dispatch }) => {
  try {
    return await getPartnersAgreementByCommunity(address);
  } catch (error) {
    const message = ErrorParser(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export interface PartnerState {
  partner: any;
  paCommunity: any;
  whitelistedAddresses: any[];
  contracts: any[];
  status: ResultState;
  paUrl: string;
  selectedDashboardBtn: string;
}

const initialState = {
  partner: null,
  paCommunity: null,
  contracts: [],
  whitelistedAddresses: [],
  paUrl: null,
  selectedDashboardBtn: null,
  status: ResultState.Idle,
};

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    resetPartnerState: () => initialState,
    setDashboardBtn(state, action) {
      state.selectedDashboardBtn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnerWhitelistedAddresses.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchPartnerWhitelistedAddresses.fulfilled, (state, action) => {
        const { whitelistedAddresses } = action.payload;
        state.whitelistedAddresses = whitelistedAddresses;
        state.status = ResultState.Idle;
      })
      .addCase(fetchPartnerWhitelistedAddresses.rejected, (state) => {
        state.whitelistedAddresses = [];
        state.status = ResultState.Failed;
      })
      .addCase(fetchPartnerContracts.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchPartnerContracts.fulfilled, (state, action) => {
        state.contracts = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(fetchPartnerContracts.rejected, (state) => {
        state.contracts = [];
        state.status = ResultState.Failed;
      })

      .addCase(fetchPaUrl.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(fetchPaUrl.fulfilled, (state, action) => {
        state.paUrl = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(fetchPaUrl.rejected, (state) => {
        state.paUrl = null;
        state.status = ResultState.Failed;
      })

      .addCase(addPaUrl.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addPaUrl.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addPaUrl.rejected, (state) => {
        state.status = ResultState.Failed;
      })

      .addCase(fetchPartnersAgreementByCommunity.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(fetchPartnersAgreementByCommunity.fulfilled, (state, action) => {
        state.paCommunity = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(fetchPartnersAgreementByCommunity.rejected, (state) => {
        state.status = ResultState.Failed;
      })

      .addCase(addNewWhitelistedAddresses.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addNewWhitelistedAddresses.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addNewWhitelistedAddresses.rejected, (state) => {
        state.status = ResultState.Failed;
      })

      .addCase(addRemoveContracts.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addRemoveContracts.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addRemoveContracts.rejected, (state) => {
        state.status = ResultState.Failed;
      });
  },
});

export const { setDashboardBtn } = partnerSlice.actions;

const addresses = (state) => state.partner.whitelistedAddresses;
const contracts = (state) => state.partner.contracts;

export const getLockedContracts = createSelector(contracts, (x1) => {
  let lockedData = LockDatatableItems(
    x1.map((c) => {
      return {
        use: 'N/A',
        address: c,
        addedBy: 'N/A',
      };
    })
  );

  if (!lockedData) {
    lockedData = [{ id: 0, isNew: true, locked: false }];
  }
  return lockedData;
});

export const getLockedWhitelistedAddresses = createSelector(addresses, (x1) => {
  let lockedData = LockDatatableItems(
    x1.map((w) => {
      return {
        name: w.name,
        address: w.address,
      };
    })
  );

  if (!lockedData) {
    lockedData = [{ id: 0, isNew: true, locked: false }];
  }
  return lockedData;
});

export default partnerSlice.reducer;
