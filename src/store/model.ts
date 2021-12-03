import { AlertColor } from '@mui/material/Alert';

export interface SnackbarPayload {
  message: string;
  severity?: AlertColor;
  duration?: number;
}
