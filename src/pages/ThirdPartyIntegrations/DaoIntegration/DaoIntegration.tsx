import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { Typography, TextField, Container } from '@mui/material';
import debounce from 'lodash.debounce';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { SwButton } from 'sw-web-shared';
import { setPreviusRoute } from '@store/ui-reducer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { RootState, useAppDispatch } from '@store/store.model';
import { useSelector } from 'react-redux';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import { addPAUrl, getPAUrl } from '@api/agreement.api';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';
import './DaoIntegration.scss';

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
  const { status, paUrl } = useSelector((state: RootState) => state.partner);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    dispatch(addPAUrl(daoUrl));
  };

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (e) => {
      setDaoUrl(e.target.value);
    };
    return debounce(changeHandler, 10);
  }, []);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/integrations-and-contracts'));
    console.log('Previous route from Integrations DAO');
  }, [dispatch]);

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
    const promise = dispatch(getPAUrl(null));
    return () => promise.abort();
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ flexGrow: 1 }}>
      <LoadingDialog open={status === ResultState.Updating} message="Adding dao url..." />
      <AlertDialog handleClose={handleClose} open={open} />
      <div className="sw-data-integration">
        <Typography
          sx={{
            mt: pxToRem(20),
            mb: pxToRem(50),
          }}
          fontSize={pxToRem(50)}
          color="primary.main"
        >
          Your SkillWallet Auth
        </Typography>
        <Typography fontSize={pxToRem(25)} color="primary.main">
          This is where your DAO lives. Add the URL where you’ll be integrating
        </Typography>
        <Typography
          sx={{
            mb: pxToRem(50),
          }}
          fontSize={pxToRem(25)}
          color="primary.main"
        >
          SkillWallet’s Decentralized Authentication System using your Partner Key.
        </Typography>

        <div className="sw-dao-form">
          <div className="sw-dao-url">
            <Typography color="primary.main" component="div" fontSize={pxToRem(25)}>
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
          <PartnerButton
            mode="light"
            btnStyles={{
              width: pxToRem(395),
              height: pxToRem(100),
              fontSize: pxToRem(28),
            }}
            disabled={!daoUrl?.length || status === ResultState.Loading || disabled}
            onClick={submit}
            endIcon={<EditIcon />}
          >
            Confirm & Sign
          </PartnerButton>
        </div>
      </div>
    </Container>
  );
};

export default memo(DaoIntegration);
