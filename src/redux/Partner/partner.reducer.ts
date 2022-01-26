import { ResultState } from '@store/result-status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LockDatatableItems } from '@components/datatable/DatatableHelpers';
import { openSnackbar } from '@store/ui-reducer';
import { createSelector } from 'reselect';
import { getPartnersAgreementByCommunity } from '@api/dito.api';
import {
  getWhitelistedAddresses,
  addAddressToWhitelist,
  getImportedContracts,
  importContractToPA,
  getPAUrl,
  addUrlToPA,
} from '@api/smart-contracts.api';
import { ParseSWErrorMessage } from 'sw-web-shared';

export const fetchPartnerWhitelistedAddresses = createAsyncThunk('partner/addresses', async (address: string, { dispatch, getState }) => {
  try {
    const whitelistedAddresses = await getWhitelistedAddresses(address);

    return {
      whitelistedAddresses,
    };
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const fetchPartnerContracts = createAsyncThunk('partner/contracts', async (address: string, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    let paCommunity = partner?.paCommunity;
    if (paCommunity?.partnersAgreementAddress !== address) {
      paCommunity = await getPartnersAgreementByCommunity(address);
    }
    const contracts = await getImportedContracts(paCommunity?.partnersAgreementAddress);

    return {
      paCommunity,
      contracts,
    };
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const fetchPaUrl = createAsyncThunk('partner/paUrl', async (address: string, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    let paCommunity = partner?.paCommunity;
    if (paCommunity?.partnersAgreementAddress !== address) {
      paCommunity = await getPartnersAgreementByCommunity(address);
    }

    const paUrl = await getPAUrl(paCommunity.partnersAgreementAddress);

    return {
      paCommunity,
      paUrl,
    };
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addPaUrl = createAsyncThunk('partner/add/paUrl', async (daoUrl: string, { dispatch, getState }) => {
  try {
    const { partner, auth }: any = getState();
    const { userInfo } = auth;
    await addUrlToPA(partner?.paCommunity.partnersAgreementAddress, daoUrl);
    return dispatch(fetchPaUrl(userInfo?.community));
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addRemoveContracts = createAsyncThunk('partner/contracs/addRemove', async (payload: any, { dispatch, getState }) => {
  try {
    const { partner, auth }: any = getState();
    const { userInfo } = auth;
    const address = partner?.paCommunity?.partnersAgreementAddress;

    const { newItems, removedItems } = payload;
    for (const item of newItems) {
      await importContractToPA(address, item.address);
    }
    for (const item of removedItems) {
      // await asyncCall(item);
    }
    return dispatch(fetchPartnerContracts(userInfo?.community));
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addNewWhitelistedAddresses = createAsyncThunk('partner/addresses/add', async (newMembers: any[], { dispatch, getState }) => {
  try {
    const {
      partner,
      auth: { userInfo },
    }: any = getState();
    for (const newMember of newMembers) {
      await addAddressToWhitelist(userInfo?.community, newMember.address);
    }
    return dispatch(fetchPartnerWhitelistedAddresses(userInfo?.community));
  } catch (error) {
    const message = ParseSWErrorMessage(error);
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
        const { paCommunity, contracts } = action.payload;
        state.paCommunity = paCommunity;
        state.contracts = contracts;
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
        const { paCommunity, paUrl } = action.payload;
        state.paCommunity = paCommunity;
        state.paUrl = paUrl;
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
        name: 'No Name',
        address: w,
      };
    })
  );

  if (!lockedData) {
    lockedData = [{ id: 0, isNew: true, locked: false }];
  }
  return lockedData;
});

export default partnerSlice.reducer;
