import { Box, Typography } from '@mui/material';
import { ReactComponent as SwBlackLogo } from '@assets/sw-logo-black.svg';

const IntegrationWelcome = () => {
  return (
    <>
      <Typography variant="h1" component="div" sx={{ mb: 6, mt: '40px' }}>
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

      <Typography variant="h3" component="div" sx={{ mb: 6 }}>
        Here you can automate a role-based Governance for your DAO & integrate a pseudonymous, Sybil-resistant login for your users.
      </Typography>
    </>
  );
};

export default IntegrationWelcome;
