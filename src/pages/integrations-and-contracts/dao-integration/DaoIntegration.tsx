import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { Typography, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { SwButton } from 'sw-web-shared';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import './dao-integration.scss';

import { RootState, useAppDispatch } from '@store/store.model';
import { useSelector } from 'react-redux';
import { addPaUrl, fetchPaUrl } from '@store/Partner/partner.reducer';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';

function AlertDialog({ handleClose, open }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ maxWidth: '420px', minWidth: '420px', minHeight: '120px' }}>
        <DialogContentText
          sx={{
            textAlign: 'center',
          }}
          id="alert-dialog-description"
        >
          <Typography variant="h1" textAlign="center" component="span" color="green">
            Transaction was successful
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SwButton onClick={handleClose} autoFocus>
          Dismiss
        </SwButton>
      </DialogActions>
    </Dialog>
  );
}

const DaoIntegration = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [daoUrl, setDaoUrl] = useState('');
  const [open, setOpen] = useState(false);
  const input = useRef<any>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { paCommunity, status, paUrl } = useSelector((state: RootState) => state.partner);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    dispatch(addPaUrl(daoUrl));
  };

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (e) => {
      setDaoUrl(e.target.value);
    };
    return debounce(changeHandler, 10);
  }, []);

  useEffect(() => {
    return () => debouncedChangeHandler.cancel();
  }, [debouncedChangeHandler]);

  useEffect(() => {
    if (paUrl && input.current) {
      input.current.value = paUrl;
    }
    setDisabled(!!paUrl);
  }, [input, paUrl]);

  useEffect(() => {
    const promise = dispatch(fetchPaUrl(userInfo?.community));
    return () => promise.abort();
  }, [dispatch, userInfo, paCommunity, paUrl]);

  return (
    <>
      <LoadingDialog open={status === ResultState.Updating} message="Adding dao url..." />
      <AlertDialog handleClose={handleClose} open={open} />
      <div className="sw-data-integration">
        <Typography sx={{ my: 2 }} component="div" variant="h1">
          Your SkillWallet Auth
        </Typography>
        <Typography sx={{ mt: 2 }} component="div" variant="h3">
          This is where your DAO lives. Add the URL where you’ll be integrating
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          SkillWallet’s Decentralized Authentication System using your Partner Key.
        </Typography>

        <div className="sw-dao-form">
          <div className="sw-dao-url">
            <Typography component="div" variant="h3">
              Your URL
            </Typography>
            <TextField
              autoFocus
              disabled={disabled || status === ResultState.Loading}
              focused
              color="primary"
              placeholder="https://letsDAO.it"
              sx={{
                width: '260px',
                '.MuiInputBase-root': {
                  color: 'primary.main',
                },
              }}
              inputRef={input}
              inputProps={{
                color: 'primary.main',
                sx: {
                  height: '33px',
                  maxHeight: '33px',
                  paddingTop: '0px !important',
                  paddingBottom: '0px',
                },
              }}
              onChange={debouncedChangeHandler}
            />
          </div>
          <SwButton
            mode="light"
            btnType="large"
            disabled={!daoUrl?.length || status === ResultState.Loading || disabled}
            onClick={submit}
            endIcon={<EditIcon />}
          >
            Confirm & Sign
          </SwButton>
        </div>
      </div>
    </>
  );
};

export default memo(DaoIntegration);
