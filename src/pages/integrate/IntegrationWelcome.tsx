import { Box, Typography } from '@mui/material';
import { ReactComponent as SwBlackLogo } from '@assets/sw-logo-black.svg';
import { pxToRem } from '@utils/text-size';

const IntegrationWelcome = () => {
  return (
    <>
      <Typography color="text.primary" fontSize={pxToRem(40)} component="div" sx={{ mb: 6, mt: '40px' }}>
        This is your Partner's Agreement!
      </Typography>

      <SwBlackLogo
        style={{
          height: '100px',
          width: 'auto',
          marginBottom: '40px',
          marginLeft: '-130px',
        }}
      />

      <Typography color="text.primary" fontSize={pxToRem(25)} component="div" sx={{ mb: 6 }}>
        Here you can automate a role-based Governance for your DAO & integrate a pseudonymous, Sybil-resistant login for your users.
      </Typography>
    </>
  );
};

export default IntegrationWelcome;
