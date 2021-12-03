import { AlertColor } from '@mui/material/Alert';
import { createSlice } from '@reduxjs/toolkit';
import { ActionPayload } from './action-payload';
import { SnackbarPayload } from './model';

export interface UIState {
  snackbar: {
    open: boolean;
    message: string;
    severity: AlertColor;
    duration: number;
  };
  logs: any[];
}

const initialState: UIState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
    duration: 2000,
  },
  logs: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addLog(state, action: ActionPayload<any>) {
      if (Array.isArray(action.payload)) {
        state.logs = [...state.logs, ...action.payload];
      } else {
        state.logs.push(action.payload);
      }
    },
    openSnackbar(state, action: ActionPayload<SnackbarPayload>) {
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
    resetUIState: () => initialState,
  },
});

export const { openSnackbar, closeSnackbar, addLog } = uiSlice.actions;

export default uiSlice.reducer;
