import { CircularProgress, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';

const LoadingDialog = ({ open, handleClose, subtitle, message, fullScreen = false }: any) => {
  const dialogSize = fullScreen
    ? {}
    : {
        maxWidth: '400px',
        minWidth: '400px',
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
          <Typography sx={{ color: 'primary.main', textAlign: 'center', mt: 2 }} component="div" variant="h2">
            {message}
          </Typography>
          <Typography sx={{ color: 'primary.main', textAlign: 'center', mt: 2 }} component="div" variant="body2">
            {subtitle}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <SwButton type="button" mode="light" onClick={handleClose} label="Cancel" />
      </DialogActions>
    </Dialog>
  );
};

export default LoadingDialog;
