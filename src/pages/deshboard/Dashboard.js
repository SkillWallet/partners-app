import { Box, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as Network } from '../../assets/dao-management.svg';
import { ReactComponent as Coins } from '../../assets/coins.svg';
import { fetchCommunity } from '../../contracts/api';
import React, { useState, useEffect } from "react";
import './dashboard.scss';
import DAOSummaryCard from './DAOSummaryCard';
import DAOManagementCard from './DAOManagementCard';
import { saveCommunity } from '../../redux/Community/community.actions';
import { connect } from 'react-redux';

const Dashboard = (props) => {

  const [showDAOManagement, setShowDAOManagement] = useState(false);

  //TODO: Move this should happen once after login and maybe remove loading progress
  useEffect(() => {
    fetchCommunity(props);
  }, []);

  const toggleDAOManagement = () => {
    setShowDAOManagement(!showDAOManagement)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'hidden',
        p: '12px'
      }}
    >
      <Box
        sx={{
          flex: 1
        }}
        className="sw-box"
      >
        <Box sx={{ pb: 'auto', mb: '160px' }} >
          <Typography textAlign='center' component="div" variant="h1">
            Welcome to your Partner Dashboard <br />
            <small> where your Community happens.</small>
          </Typography>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            width: 4 / 5
          }}
        >
          <SwButton
            sx={{
              whiteSpace: 'nowrap',
              width: 1,
              borderColor: "primary.main",
              height: '85px',
              mb: '48px'
            }}
            endIcon={<Network className="sw-btn-icon" width="30px" />}
            label="DAO Management"
            className={showDAOManagement ? 'active-link' : ''}
            onClick={toggleDAOManagement}
          />
          <SwButton
            disabled
            sx={{
              whiteSpace: 'nowrap',
              width: 1,
              borderColor: "primary.main",
              height: '85px'
            }}
            endIcon={<Coins className="sw-btn-icon" width="30px" />}
            label="Rewards">
            <Typography variant='h2' textAlign='center'>
              Rewards <br />
              <small> (coming soon)</small>
            </Typography>
          </SwButton>
        </Box>
      </Box>
      {showDAOManagement ?
        <DAOManagementCard /> :
        <DAOSummaryCard />
      }
    </Box>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
  }
}

export default connect(undefined, mapDispatchToProps)(Dashboard);