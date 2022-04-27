import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logoBlack from '@assets/sw-logo-black.svg';
import { ReactComponent as NetworkIcon } from '@assets/network.svg';
import { ReactComponent as AnalyticsIcon } from '@assets/analytics-dark.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';
import './GetStarted.scss';

const GetStarted = () => {
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="sw-get-started-container">
      <Box className="black-box">
        <Box sx={{ p: 0, m: 0 }} className="left-box">
          <Box className="sw-box-logo">
            <img src={logoBlack} className="new-logo-img" alt="skillwallet logo" />
          </Box>

          <Typography
            component="div"
            sx={{ ml: '32px', mt: '40px', color: 'text.primary' }}
            fontWeight="bold"
            align="left"
            fontSize={pxToRem(50)}
          >
            Welcome, Partner
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: '85px' }} className="right-box">
        <Box className="sw-box-title">
          <Typography color="primary" component="div" sx={{ mb: '20px' }} align="left" fontSize={pxToRem(50)}>
            Do more with your DAO.
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" align="left" fontSize={pxToRem(25)}>
            SkillWallets are individual NFT IDs that unlock
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" sx={{ mb: '60px' }} align="left" fontSize={pxToRem(25)}>
            the true potential of Web3 Communities.
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" align="left" fontSize={pxToRem(30)}>
            Our Partners can bootstrap a role-based membership - with
          </Typography>
          <Typography lineHeight="1" color="primary" component="div" sx={{ mb: '70px' }} align="left" fontSize={pxToRem(30)}>
            Native Governance & On-Chain Analytics for their DAO.
          </Typography>

          <Box className="sw-box-actions">
            <PartnerButton
              disabled={isAutheticated}
              mode="light"
              endIcon={<NetworkIcon />}
              component={Link}
              to="/integrate"
              btnStyles={{
                width: pxToRem(450),
                height: pxToRem(100),
              }}
            >
              <>
                <Typography fontWeight="bold" component="div" align="left" fontSize={pxToRem(45)}>
                  Integrate
                </Typography>
                <Typography component="div" align="left" fontSize={pxToRem(20)} lineHeight={1}>
                  SkillWallet Auth
                </Typography>
              </>
            </PartnerButton>

            <PartnerButton
              mode="light"
              btnStyles={{
                width: pxToRem(450),
                height: pxToRem(100),
              }}
              endIcon={<AnalyticsIcon />}
              disabled={!isAutheticated}
              component={Link}
              to="/partner/dashboard"
            >
              <>
                <Typography fontWeight="bold" component="div" align="left" fontSize={pxToRem(45)}>
                  Partners
                </Typography>
                <Typography component="div" align="left" fontSize={pxToRem(20)} lineHeight={1}>
                  Dashboard
                </Typography>
              </>
            </PartnerButton>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default GetStarted;
