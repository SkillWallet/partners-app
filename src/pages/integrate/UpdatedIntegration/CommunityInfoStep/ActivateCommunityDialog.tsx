import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { SwButton, SwClipboardCopy } from 'sw-web-shared';

const ActivateCommunityDialog = ({ open, handleClose, onActivateCommunity, agreementKey, fullScreen = false }: any) => {
  const dialogSize = fullScreen
    ? {}
    : {
        maxWidth: '420px',
        minWidth: '420px',
        minHeight: '300px',
      };
  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogContent
        sx={{
          ...dialogSize,
          bgcolor: 'background.paper',
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ color: 'primary.main', textAlign: 'center', mt: 2 }} component="div" variant="h1">
            Congrats, Partner!
          </Typography>
          <Typography sx={{ color: 'primary.main', textAlign: 'center', mt: 2 }} component="div" variant="h2">
            You've successfully integrated the SkillWallet.
          </Typography>
          <Typography sx={{ color: 'primary.main', textAlign: 'center', mt: 2, mb: 2 }} component="div" variant="body1">
            As promised, here is your Access Key. Copy it & keep it safe:
          </Typography>

          <SwClipboardCopy url={agreementKey} mode="light" />

          <Typography sx={{ color: 'primary.main', textAlign: 'center', mt: 2 }} component="div" variant="body1">
            Last but not least, activate Community Name by picking your SkillWallet Role:
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <SwButton type="button" mode="light" onClick={onActivateCommunity} label="Activate!" />
      </DialogActions>
    </Dialog>
  );
};

export default ActivateCommunityDialog;
