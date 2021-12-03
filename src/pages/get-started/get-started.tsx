import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './get-started.scss';

import logoBlack from '@partners-assets/sw-logo-black.svg';
import { ReactComponent as NetworkIcon } from '@partners-assets/network.svg';
import { ReactComponent as AnalyticsIcon } from '@partners-assets/analytics-dark.svg';
import { RootState } from '@partners-store/store.model';
import { useSelector } from 'react-redux';
import { SwButton } from 'sw-web-shared';

const GetStarted = () => {
  const { isAutheticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="sw-get-started-container">
      <Box sx={{ p: 0, m: 0 }} className="sw-box">
        <Box className="sw-box-logo">
          <img src={logoBlack} className="new-logo-img" alt="skillwallet logo" />
        </Box>

        <Typography color="info" component="div" sx={{ ml: '32px', mt: '40px' }} fontWeight="bold" align="left" variant="h1">
          Welcome, Partner
        </Typography>
      </Box>
      <Box sx={{ p: 0, m: 0 }} className="sw-box">
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
          {/* <Badge
            badgeContent={
              <Tooltip title="Coming soon!">
                <InfoIcon
                  sx={{
                    bgcolor: 'text.primary',
                    color: 'primary.main',
                    borderRadius: '50%',
                    fontSize: '1.2rem',
                    position: 'absolute',
                  }}
                />
              </Tooltip>
            }
          >
            
          </Badge> */}
          <SwButton endIcon={<NetworkIcon className="sw-btn-icon" />} component={Link} to="/integrate">
            <>
              <Typography fontWeight="bold" component="div" align="left" variant="h1">
                Integrate
              </Typography>
              <Typography component="div" align="left" variant="h3">
                SkillWallet Auth
              </Typography>
            </>
          </SwButton>

          <SwButton endIcon={<AnalyticsIcon className="sw-btn-icon" />} disabled={!isAutheticated} component={Link} to="/analytics">
            <>
              <Typography fontWeight="bold" component="div" align="left" variant="h1">
                Partners
              </Typography>
              <Typography component="div" align="left" variant="h3">
                Analytics
              </Typography>
            </>
          </SwButton>
        </Box>
      </Box>
    </div>
  );
};

export default GetStarted;