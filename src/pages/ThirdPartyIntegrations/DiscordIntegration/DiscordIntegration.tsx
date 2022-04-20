import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { Typography, TextField, Container, Box } from '@mui/material';
import debounce from 'lodash.debounce';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { setPreviusRoute } from '@store/ui-reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import { useSelector } from 'react-redux';
import { addDiscordWebhook } from '@store/Partner/partner.reducer';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import { environment } from '@api/environment';
import PartnerButton from '@components/Button';
import { pxToRem } from '@utils/text-size';
import './DiscordIntegration.scss';

const DiscordIntegration = () => {
  const dispatch = useAppDispatch();
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
  }, [input, paCommunity.discordWebhookUrl]);

  return (
    <Container maxWidth="md" sx={{ flexGrow: 1 }}>
      <LoadingDialog open={status === ResultState.Updating} message="Adding webhook..." />
      <div className="sw-data-integration">
        <Typography
          sx={{
            mt: pxToRem(20),
            mb: pxToRem(50),
          }}
          fontSize={pxToRem(50)}
          color="primary.main"
        >
          Your Community life, directly on your server.
        </Typography>
        <Typography fontSize={pxToRem(25)} color="primary.main">
          Create Tasks and let your community contribute - directly on Discord!
        </Typography>
        <Typography
          sx={{
            mb: pxToRem(50),
          }}
          fontSize={pxToRem(25)}
          color="primary.main"
        >
          SkillWallet's Discord Bot is a bridge between Web2 and Web3 - to track like a wizard, and react like a 🧙
        </Typography>

        <div className="sw-dao-form">
          <div className="sw-dao-url">
            <Typography color="primary.main" component="div" fontSize={pxToRem(25)}>
              Webhook
            </Typography>
            <TextField
              autoFocus
              disabled={status === ResultState.Loading}
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
          <PartnerButton
            mode="light"
            btnStyles={{
              width: pxToRem(395),
              height: pxToRem(100),
              fontSize: pxToRem(28),
            }}
            disabled={!discordUrl?.length || status === ResultState.Loading}
            onClick={submit}
            endIcon={<EditIcon />}
          >
            Add & Sign
          </PartnerButton>
        </div>

        <Typography color="primary" sx={{ mb: pxToRem(40) }} component="div" fontSize={pxToRem(25)}>
          How to do it (in a minute, with no tech exp required):
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: pxToRem(29) }}>
          <Box>
            <Typography color="primary" sx={{ mb: 2 }} component="div" fontSize={pxToRem(22)}>
              1. Open your Discord Server
            </Typography>
            <Typography color="primary" sx={{ mb: 2 }} component="div" fontSize={pxToRem(22)}>
              {`2. Go to Settings --> Integrations --> Webhooks`}
            </Typography>
          </Box>
          <Box>
            <Typography color="primary" sx={{ mb: 2 }} component="div" fontSize={pxToRem(22)}>
              3. Create your Webhook, and copy its URL
            </Typography>
            <Typography color="primary" sx={{ mb: 2 }} component="div" fontSize={pxToRem(22)}>
              4. Come back here, and Paste that URL 🙂
            </Typography>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default memo(DiscordIntegration);
