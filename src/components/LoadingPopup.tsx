import { CircularProgress, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';

const LoadingDialog = ({ mode = 'light', open, handleClose, subtitle, message, fullScreen = false }: any) => {
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
          bgcolor: mode === 'light' ? 'background.paper' : 'background.default',
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
          <CircularProgress
            sx={{
              color: mode === 'light' ? 'primary.main' : 'text.primary',
            }}
          />
          <Typography
            sx={{ color: mode === 'light' ? 'primary.main' : 'text.primary', textAlign: 'center', mt: 2 }}
            component="div"
            variant="h2"
          >
            {message}
          </Typography>
          <Typography
            sx={{ color: mode === 'light' ? 'primary.main' : 'text.primary', textAlign: 'center', mt: 2 }}
            component="div"
            variant="body2"
          >
            {subtitle}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: mode !== 'light' ? 'primary.main' : 'text.primary',
        }}
      >
        <SwButton type="button" mode={mode} onClick={handleClose} label="Cancel" />
      </DialogActions>
    </Dialog>
  );
};

export default LoadingDialog;
