import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { bgcolor } from '@mui/system';
import React, { useState } from "react";
import { connect } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const DAOSummaryCard = (props) => {

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: 'auto',
        ms: '144px',
      }}
    >
      {props.state.community ?
        <React.Fragment>
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
              backgroundColor: 'background.dark'
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
                  src={props.state.community.image}
                />
              }
              sx={{
                ".MuiAvatar-root": {
                  backgroundColor: "transparent",
                },
              }}
              title={props.state.community.name}
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
                {props.state.community.description}
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
              title={props.state.community.template}
              titleTypographyProps={{
                variant: "h3",
                color: "primary.main"
              }}
            />
          </Card>
        </React.Fragment>
      : <CircularProgress sx={{
        justifyContent:'center',
        alignContent: 'center'
      }}/>}
    </Box>
  );
};

const mapStateToProps = state => {
  console.log('state: ', state);
  return {
    state: {
      community: state.community.community
    }
  }
}

export default connect(mapStateToProps)(DAOSummaryCard);