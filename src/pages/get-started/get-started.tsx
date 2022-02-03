import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logoBlack from '@assets/sw-logo-black.svg';
import { ReactComponent as NetworkIcon } from '@assets/network.svg';
import { ReactComponent as AnalyticsIcon } from '@assets/analytics-dark.svg';
import { SwButton } from 'sw-web-shared';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';
import './get-started.scss';
import { useEffect } from 'react';

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
      <Box sx={{ px: '85px' }} className="right-box">
        <Box className="sw-box-title">
          <Typography color="primary" component="div" sx={{ mb: '20px' }} align="left" variant="h1">
            Do more with your DAO.
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" align="left" variant="subtitle1">
            SkillWallets are individual NFT IDs that unlock
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" sx={{ mb: '60px' }} align="left" variant="subtitle1">
            the true potential of Web3 Communities.
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" align="left" variant="h2">
            Our Partners can bootstrap a role-based membership - with
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" sx={{ mb: '70px' }} align="left" variant="h2">
            Native Governance & On-Chain Analytics for their DAO.
          </Typography>

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
      </Box>
    </div>
  );
};

export default GetStarted;
