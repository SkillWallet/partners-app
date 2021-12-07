import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'; 
import { ReactComponent as CoreTeam } from '../../assets/core-team.svg';
import { ReactComponent as Community } from '../../assets/community.svg';
import { SwButton } from 'sw-web-shared';
import { Link } from "react-router-dom";
import React, { useState } from "react"; 
 
const DAOManagementCard = () => {
 
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
        title="Design Roles, Skills & Membership for your DAO"
        titleTypographyProps={{
          mx: "auto",
          variant: "h3",
          color: "primary.main"
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
            component={Link}
            to="/partner/dashboard/core"
            endIcon={<CoreTeam className="sw-btn-icon" width="30px" />} 
          >Core Team
          </SwButton>
          <SwButton
            sx={{
              whiteSpace: 'nowrap',
              width: 1,
              borderColor: "primary.main",
              height: '85px'
            }}
            endIcon={<Community className="sw-btn-icon" width="30px" />}
            label="Community"
          />
        </Box>
      </CardContent>
    </Card>
  </Box>
  );
};

export default DAOManagementCard;