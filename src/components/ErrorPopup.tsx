import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';

const ErrorDialog = ({ mode = 'light', open, hasRetry = false, handleClose, subtitle, message, fullScreen = false }: any) => {
  const dialogSize = fullScreen
    ? {}
    : {
        maxWidth: '400px',
        minWidth: '400px',
        minHeight: '200px',
      };
  return (
    <Dialog open={open} fullScreen={fullScreen}>
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
          <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }} component="div" variant="h2">
            {message}
          </Typography>
          <Typography
            sx={{ color: mode === 'light' ? 'primary.main' : 'text.primary', textAlign: 'center', mt: 2 }}
            component="div"
            variant="body2"
          >
            {subtitle}
          </Typography>
          {hasRetry && <SwButton type="button" btnType="medium" mode={mode} onClick={() => handleClose('retry')} label="Retry" />}
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: mode !== 'light' ? 'primary.main' : 'text.primary',
        }}
      >
        <SwButton type="button" mode={mode} onClick={() => handleClose('close')} label="Dismiss" />
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
