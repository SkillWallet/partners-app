import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as Network } from '../../assets/network.svg';
import { ReactComponent as Coins } from '../../assets/coins.svg';
import { ReactComponent as CoreTeam } from '../../assets/core-team.svg';
import { ReactComponent as Community } from '../../assets/community.svg';
import React, { useState } from "react";

const community = {
    name: "SkillWallet @ Tachyon",
    address: "0x2D1bf1e15F9B17DfA2067869833576a59Bbb0f26",
    description: "This is the Tachyon Demo of SkillWallet - a role-based NFT ID that unlocks the true potential of Web3 Communities 🙌",
    template: "Local Projects & DAOs",
    image: "https://hub.textile.io/ipfs/bafkreigoiviheddeus2q4prbg26eiamz3aldxx3o44rhi5gw6iafvomate",
    isDiToNativeCommunity: false
  }

const CoreTeamMenu = () => {

  const [showDAOManagement, setSshowDAOManagement] = useState(false);
 
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
            />
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
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
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
                    height: "111px",
                    width: "111px"
                  }}
                  variant="square"
                  src={community.image}
                />
          </Box>
        </Box> 
    </Box>
  );
};

export default CoreTeamMenu;