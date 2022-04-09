import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { Typography, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { SwButton } from 'sw-web-shared';
import { setPreviusRoute } from '@store/ui-reducer';

import { RootState, useAppDispatch } from '@store/store.model';
import { useSelector } from 'react-redux';
import { addDiscordWebhook } from '@store/Partner/partner.reducer';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import { environment } from '@api/environment';
import './discord-integration.scss';

const DiscordIntegration = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [discordUrl, setDiscordUrl] = useState('');
  const input = useRef<any>();
  const { status, paCommunity } = useSelector((state: RootState) => state.partner);

  const submit = async () => {
    dispatch(
      addDiscordWebhook({
        partnerKey: environment.partnersKey,
        discordWebhook: discordUrl,
      })
    );
  };

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (e) => {
      setDiscordUrl(e.target.value);
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
    if (paCommunity.discordWebhookUrl && input.current) {
      input.current.value = paCommunity.discordWebhookUrl;
    }
    setDisabled(!!paCommunity.discordWebhookUrl);
  }, [input, paCommunity.discordWebhookUrl]);

  return (
    <>
      <LoadingDialog open={status === ResultState.Updating} message="Adding webhook..." />
      <div className="sw-data-integration">
        <Typography sx={{ my: 2 }} component="div" variant="h1">
          Your Community life, directly on your server.
        </Typography>

        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          Create Tasks and let your community contribute - directly on Discord!
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          SkillWallet's Discord Bot is a bridge between Web2 and Web3 - to track like a wizard, and react like a 🧙
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
              placeholder="https://discord.it"
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
            disabled={!discordUrl?.length || status === ResultState.Loading || disabled}
            onClick={submit}
            endIcon={<EditIcon />}
          >
            Add & Sign
          </SwButton>
        </div>

        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          How to do it:
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          1. Open your Discord Server
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          {`2. Go to Settings --> Integrations --> Webhooks`}
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          3. Create your Webhook, and copy its URL
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          4. Come back here, and Paste that URL 🙂
        </Typography>
      </div>
    </>
  );
};

export default memo(DiscordIntegration);
