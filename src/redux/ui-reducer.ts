import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
    duration: 2000,
  },
  logs: [],
  previousRoute: '/',
  transactionState: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addLog(state, action) {
      if (Array.isArray(action.payload)) {
        state.logs = [...state.logs, ...action.payload];
      } else {
        state.logs.push(action.payload);
      }
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity || 'success';
      state.snackbar.duration = action.payload.duration || 4000;
    },
    closeSnackbar(state) {
      state.snackbar = {
        ...state.snackbar,
        open: false,
      };
    },
    updateTransactionState(state, action) {
      state.transactionState = action.payload;
    },
    setPreviusRoute(state, action) {
      state.previousRoute = action.payload;
    },
    resetUIState: () => initialState,
  },
});

export const { openSnackbar, closeSnackbar, addLog, setPreviusRoute, updateTransactionState } = uiSlice.actions;

export default uiSlice.reducer;
