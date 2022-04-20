import { ResultState } from '@store/result-status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LockDatatableItems } from '@components/datatable/DatatableHelpers';
import { openSnackbar } from '@store/ui-reducer';
import { createSelector } from 'reselect';
import { getPartnersAgreementByCommunity } from '@api/dito.api';
import { addDiscordUrl } from '@api/skillwallet.api';
import { ErrorParser } from '@utils/error-parser';
import { getPAContracts, getPAUrl, addPAUrl, addPAContracts } from '@api/agreement.api';
import { getWhitelistedAddresses, addNewWhitelistedAddresses } from '@api/community.api';

export const fetchPartnersAgreementByCommunity = createAsyncThunk('partner/agreement/community', async (address: string, { dispatch }) => {
  try {
    return await getPartnersAgreementByCommunity(address);
  } catch (error) {
    const message = ErrorParser(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const addDiscordWebhook = createAsyncThunk('partner/discord/addurl', async (payload: any, { dispatch }) => {
  try {
    const { partnerKey, discordWebhook } = payload;
    const url = await addDiscordUrl(partnerKey, discordWebhook);
    dispatch(openSnackbar({ message: 'Discord webhook was updated successfully', severity: 'success' }));
    return url;
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
  errorMessage: string;
}

const initialState = {
  partner: null,
  paCommunity: null,
  contracts: [],
  whitelistedAddresses: [],
  paUrl: null,
  selectedDashboardBtn: null,
  status: ResultState.Idle,
  errorMessage: '',
};

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    resetPartnerState: () => initialState,
    setDashboardBtn(state, action) {
      state.selectedDashboardBtn = action.payload;
    },
    setPartnersAgreementCommunity(state, action) {
      state.paCommunity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDiscordWebhook.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addDiscordWebhook.fulfilled, (state, action) => {
        state.paCommunity = {
          ...(state.paCommunity || {}),
          discordWebhookUrl: action.payload,
        };

        try {
          const authState = JSON.parse(sessionStorage.getItem('skillWallet'));
          sessionStorage.setItem(
            'skillWallet',
            JSON.stringify({
              ...authState,
              partnersAgreementKey: {
                ...(authState.partnersAgreementKey || {}),
                discordWebhookUrl: action.payload,
              },
            })
          );
        } catch (error) {
          // console.log(error);
        }
        state.status = ResultState.Idle;
      })
      .addCase(addDiscordWebhook.rejected, (state) => {
        state.status = ResultState.Failed;
      })
      .addCase(getWhitelistedAddresses.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(getWhitelistedAddresses.fulfilled, (state, action) => {
        state.whitelistedAddresses = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(getWhitelistedAddresses.rejected, (state, action) => {
        state.whitelistedAddresses = [];
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })
      .addCase(getPAContracts.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(getPAContracts.fulfilled, (state, action) => {
        state.contracts = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(getPAContracts.rejected, (state, action) => {
        state.contracts = [];
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })

      .addCase(getPAUrl.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(getPAUrl.fulfilled, (state, action) => {
        state.paUrl = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(getPAUrl.rejected, (state, action) => {
        state.paUrl = null;
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })

      .addCase(addPAUrl.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addPAUrl.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addPAUrl.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })

      .addCase(fetchPartnersAgreementByCommunity.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(fetchPartnersAgreementByCommunity.fulfilled, (state, action) => {
        state.paCommunity = action.payload;
        state.status = ResultState.Idle;
      })
      .addCase(fetchPartnersAgreementByCommunity.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })

      .addCase(addNewWhitelistedAddresses.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addNewWhitelistedAddresses.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addNewWhitelistedAddresses.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      })

      .addCase(addPAContracts.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(addPAContracts.fulfilled, (state) => {
        state.status = ResultState.Idle;
      })
      .addCase(addPAContracts.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setDashboardBtn, setPartnersAgreementCommunity } = partnerSlice.actions;

const addresses = (state) => state.partner.whitelistedAddresses;
const contracts = (state) => state.partner.contracts;

export const DiscordWebHookUrl = (state) => state.partner?.paCommunity?.discordWebhookUrl;

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

  if (!lockedData.length) {
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

  if (!lockedData.length) {
    lockedData = [{ id: 0, isNew: true, locked: false }];
  }
  return lockedData;
});

export default partnerSlice.reducer;
