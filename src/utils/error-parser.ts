import { openSnackbar } from '@store/ui-reducer';
import { AxiosResponse } from 'axios';

export const ErrorParser = (error: any, dispatch?: any): any => {
  let message = 'Server error';
  try {
    const errResponse = error.response as AxiosResponse<any>;
    if (errResponse && errResponse.status !== 500) {
      message = errResponse.data.error;
    }
  } catch (err) {
    message = 'Server error';
  }

  if (dispatch) {
    dispatch(openSnackbar({ message, severity: 'error' }));
  }
  throw new Error(error);
};
