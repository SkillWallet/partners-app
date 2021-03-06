import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { validatePartnerAgreementKey } from '@store/Integrate/integrate';
import { ResultState } from '@store/result-status';
import { RootState, useAppDispatch } from '@store/store.model';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SwButton } from 'sw-web-shared';
import './ValidatePAAccessKeyDialog.scss';

const ValidatePAAccessKeyDialog = ({ open, handleClose, handleActivation, fullScreen = false }: any) => {
  const dispatch = useAppDispatch();
  const [key, setKey] = useState('');
  const { status, isValidKey } = useSelector((state: RootState) => state.integrate);

  const validate = async () => {
    const result = await dispatch(validatePartnerAgreementKey(key));
    if (result.payload) {
      handleActivation(key);
    }
  };

  const keyValueChange = ({ target }) => {
    setKey(target.value);
  };

  const dialogSize = fullScreen
    ? {}
    : {
        maxWidth: '400px',
        minWidth: '400px',
        minHeight: '200px',
      };
  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle
        sx={{
          bgcolor: 'background.default',
        }}
      >
        <Typography sx={{ color: 'text.primary', textAlign: 'center' }} component="div" variant="h1">
          Validate Access Key
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          ...dialogSize,
          bgcolor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          className="sw-validate-access-dialog-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <TextField
                sx={{
                  '.MuiInputBase-input': {
                    color: 'black',
                    '&::placeholder': {
                      opacity: 1,
                      color: '#707070',
                    },
                    '&::-webkit-input-placeholder': {
                      color: '#707070',
                      opacity: 1,
                    },
                    '&::-moz-placeholder': {
                      color: '#707070',
                      opacity: 1,
                    },
                  },
                }}
                autoFocus
                disabled={status === ResultState.Loading}
                required
                type="password"
                focused
                onChange={keyValueChange}
                color="primary"
                placeholder="Enter key..."
              />
            </div>
          </div>

          {!isValidKey && status === ResultState.Success ? (
            <Typography sx={{ color: 'error.main', textAlign: 'center', mt: 4 }} component="div" variant="body1">
              Contact the skillwallet team for a beta access to the page
            </Typography>
          ) : null}
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: 'background.default',
        }}
        className="validate-actions"
      >
        <SwButton mode="dark" sx={{ height: '55px' }} type="button" disabled={!key || status === ResultState.Loading} onClick={validate}>
          {status === ResultState.Loading ? <CircularProgress size="35px" /> : 'Validate'}
        </SwButton>
      </DialogActions>
    </Dialog>
  );
};

export default ValidatePAAccessKeyDialog;
