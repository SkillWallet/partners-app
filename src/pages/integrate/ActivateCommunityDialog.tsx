import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { SwButton, SwClipboardCopy } from 'sw-web-shared';

const trimAddressKey = (address: string) => {
  if (!address) return;
  const middle = Math.ceil(address.length / 2);
  const left = address.slice(0, middle).substring(0, 15);
  let right = address.slice(middle);
  right = right.substr(right.length - 15);
  return `${left}...${right}`;
};

const ActivateCommunityDialog = ({ open, handleClose, onActivateCommunity, agreementKey, fullScreen = false }: any) => {
  const dialogSize = fullScreen
    ? {}
    : {
        maxWidth: '415px',
        minWidth: '515px',
        minHeight: '440px',
      };
  return (
    <Dialog open={open} fullScreen={fullScreen}>
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
          className="sw-join-dialog-content"
          style={{
            display: 'flex',
            flex: 1,
            width: '380px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
            marginTop: '20px',
          }}
        >
          <Typography color="text.primary" sx={{ textAlign: 'center', mt: 2 }} component="div" variant="h1">
            Congrats, Partner! 🎉🎉🎉
          </Typography>
          <Typography color="text.primary" sx={{ textAlign: 'center' }} component="div" variant="h4">
            You've successfully integrated the SkillWallet. <br /> As promised, here is your Access Key. <br /> Copy it & keep it safe:
          </Typography>

          <SwClipboardCopy
            sx={{
              width: 'calc(100% - 30px)',
            }}
            // @ts-ignore
            trim={trimAddressKey}
            url={agreementKey}
            mode="dark"
          />

          <Typography color="text.primary" sx={{ textAlign: 'center' }} component="div" variant="body1">
            Last but not least, activate Community Name <br /> by picking your SkillWallet Role:
          </Typography>
          <SwButton type="button" mode="light" onClick={onActivateCommunity} label="Activate!" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivateCommunityDialog;
