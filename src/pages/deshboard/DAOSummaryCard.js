import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'; 
import React, { useState } from "react"; 

const community = {
  name: "SkillWallet @ Tachyon",
  address: "0x2D1bf1e15F9B17DfA2067869833576a59Bbb0f26",
  description: "This is the Tachyon Demo of SkillWallet - a role-based NFT ID that unlocks the true potential of Web3 Communities 🙌",
  template: "Local Projects & DAOs",
  image: "https://hub.textile.io/ipfs/bafkreigoiviheddeus2q4prbg26eiamz3aldxx3o44rhi5gw6iafvomate",
  isDiToNativeCommunity: false
}

const DAOSummaryCard = () => {
 
  return (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      my: 'auto',
      ms: '144px'
    }}
  >
    <Card
      sx={{
        height: "313px",
        width: 4 / 5,
        mt: "40px",
        mb: "20px",
        p: "15px 34px",
        border: "1px solid",
        borderColor: "primary.main",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              height: "54px",
              width: "54px"
            }}
            variant="square"
            src={community.image}
          />
        }
        sx={{
          ".MuiAvatar-root": {
            backgroundColor: "transparent",
          },
        }}
        title={community.name}
        titleTypographyProps={{
          mx: "auto",
          variant: "h3",
          color: "primary.main",
          mt: "6px",
        }}
      />
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          color="primary.main"
          variant="body1"
          component="div"
        >
          {community.description}
        </Typography>
      </CardContent>
    </Card>
    <Card
      sx={{ 
        width: 4 / 5, 
        border: "1px solid",
        borderColor: "primary.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        <CardHeader 
        title={community.template}
        titleTypographyProps={{ 
          variant: "h3",
          color: "primary.main"
        }}
      /> 
    </Card>
  </Box>
  );
};

export default DAOSummaryCard;