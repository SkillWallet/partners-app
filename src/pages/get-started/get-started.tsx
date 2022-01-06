import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logoBlack from '@assets/sw-logo-black.svg';
import { ReactComponent as NetworkIcon } from '@assets/network.svg';
import { ReactComponent as AnalyticsIcon } from '@assets/analytics-dark.svg';
import { SwButton } from 'sw-web-shared';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';
import './get-started.scss';

const GetStarted = () => {
  const { isAutheticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="sw-get-started-container">
      <Box className="black-box">
        <Box sx={{ p: 0, m: 0 }} className="left-box">
          <Box className="sw-box-logo">
            <img src={logoBlack} className="new-logo-img" alt="skillwallet logo" />
          </Box>

          <Typography component="div" sx={{ ml: '32px', mt: '40px' }} fontWeight="bold" align="left" variant="h1" color="text.primary">
            Welcome, Partner
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 0, m: 0 }} className="right-box">
        <Box className="sw-box-title">
          <Typography color="primary" component="div" sx={{ ml: '32px', mt: '40px' }} fontWeight="bold" align="left" variant="h1">
            Do more with your DAO
          </Typography>
          <Typography color="info.dark" component="div" sx={{ ml: '32px', mt: '40px' }} fontWeight="bold" align="left" variant="h2">
            SkillWallets are individual NFT IDs that unlock the true potential of Web3 Communities.
          </Typography>
          <Typography color="info.dark" component="div" sx={{ ml: '32px', mt: '40px' }} fontWeight="bold" align="left" variant="h2">
            Our Partners can bootstrap a role-based membership - with Native Governance & On-Chain Analytics for their DAO.
          </Typography>
        </Box>
        <Box className="sw-box-actions">
          <SwButton mode="light" btnType="large" endIcon={<NetworkIcon />} component={Link} to="/integrate">
            <>
              <Typography fontWeight="bold" component="div" align="left" variant="h1">
                Integrate
              </Typography>
              <Typography component="div" align="left" variant="h3">
                SkillWallet Auth
              </Typography>
            </>
          </SwButton>

          <SwButton
            mode="light"
            btnType="large"
            endIcon={<AnalyticsIcon />}
            disabled={!isAutheticated}
            component={Link}
            to="/partner/dashboard"
          >
            <>
              <Typography fontWeight="bold" component="div" align="left" variant="h1">
                Partners
              </Typography>
              <Typography component="div" align="left" variant="h3">
                Dashboard
              </Typography>
            </>
          </SwButton>
        </Box>
      </Box>
    </div>
  );
};

export default GetStarted;
