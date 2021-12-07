import { Box, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as Network } from '../../assets/network.svg';
import { ReactComponent as Coins } from '../../assets/coins.svg'; 
import React, { useState } from "react";
import './dashboard.scss';
import DAOSummaryCard from './DAOSummaryCard';
import DAOManagementCard from './DAOManagementCard';
 
const Dashboard = () => {

  const [showDAOManagement, setSshowDAOManagement] = useState(false);

  const DAOManagementClicked = () => {
    console.log(!showDAOManagement)
    setSshowDAOManagement(!showDAOManagement)
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
            onClick={DAOManagementClicked}
          />
          <SwButton
            disabled
            sx={{
              whiteSpace: 'nowrap',
              width: 1,
              borderColor: "primary.main",
              height: '85px'
            }}
            endIcon={<Coins sx={{
              ms: '50px'
            }} className="sw-btn-icon" width="30px" />}
            label="Rewards">
            <Typography textAlign='center'>
              Rewards <br />
              <small> (coming soon)</small>
            </Typography>
          </SwButton>
        </Box>
      </Box>
      {showDAOManagement ?
        <DAOManagementCard/> :
        <DAOSummaryCard/>
      }
    </Box>
  );
};

export default Dashboard;