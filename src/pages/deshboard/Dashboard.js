import { SwButton } from 'sw-web-shared';
import { ReactComponent as Network } from '../../assets/network.svg';
import { ReactComponent as Coins } from '../../assets/coins.svg';
import React, { useState } from "react";
import './dashboard.scss';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { ReactComponent as Member } from '../../assets/member-card.svg';
import { ReactComponent as Roles } from '../../assets/roles.svg';
import { ReactComponent as Share } from '../../assets/share.svg';

const community = {
  name: "SkillWallet @ Tachyon",
  address: "0x2D1bf1e15F9B17DfA2067869833576a59Bbb0f26",
  description: "This is the Tachyon Demo of SkillWallet - a role-based NFT ID that unlocks the true potential of Web3 Communities 🙌",
  template: "Local Projects & DAOs",
  image: "https://hub.textile.io/ipfs/bafkreigoiviheddeus2q4prbg26eiamz3aldxx3o44rhi5gw6iafvomate",
  isDiToNativeCommunity: false
}

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
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar
            sx={{
              flex: 1,
              height: "111px",
              width: "111px"
            }}
            variant="square"
            src={community.image}
          /> 
        <Box
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        > 
            <Typography>
              {community.name}
            </Typography>
            <Typography>
              Core Team
            </Typography> 
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1
        }}
        className="sw-box"
      >
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
            endIcon={<Member className="sw-btn-icon" width="30px" />}
            label="Members"
          />
          <SwButton
            sx={{
              whiteSpace: 'nowrap',
              width: 1,
              borderColor: "primary.main",
              height: '85px',
              mb: '48px'
            }}
            endIcon={<Roles className="sw-btn-icon" width="30px" />}
            label="Roles & Skills">
          </SwButton>
          <SwButton
            sx={{
              whiteSpace: 'nowrap',
              width: 1,
              borderColor: "primary.main",
              height: '85px'
            }}
            endIcon={<Share className="sw-btn-icon" width="30px" />}
            label="Invite & Share">
          </SwButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;