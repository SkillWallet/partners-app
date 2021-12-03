import { openSnackbar } from '@partners-store/ui-reducer';
import { AxiosResponse } from 'axios';

export const ErrorParser = (error: any, dispatch?: any): string | void => {
  let message = 'Server error';
  try {
    const errResponse = error.response as AxiosResponse<any>;
    if (errResponse && errResponse.status !== 500) {
      message = errResponse.data.error;
      debugger;
    }
  } catch (err) {
    message = 'Server error';
  }

  if (dispatch) {
    dispatch(openSnackbar({ message, severity: 'error' }));
  }
  throw new Error(error);
};
