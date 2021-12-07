import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as Network } from '../../assets/network.svg';
import { ReactComponent as Coins } from '../../assets/coins.svg';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        p: '12px'
      }}
    >
      <Box
        sx={{
          width: 1 / 2
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
              width: 1,
              borderColor: "primary.main",
              height: '85px'
            }}
            endIcon={<Coins className="sw-btn-icon" width="30px" />}
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
          width: 1 / 2,
          my: 'auto'
        }} 
      >
        <Card
          sx={{
            height: "401px",
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
                  height: "27px",
                }}
                variant="square"
                component={"SAS"}
              />
            }
            sx={{
              ".MuiAvatar-root": {
                backgroundColor: "transparent",
              },
            }}
            title={"SAS"}
            titleTypographyProps={{
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
              {"Coordinating Space, Talent, and Culture.:"}
              <br></br>
              {"We want to build a project that doesn’t have to win. "}
              <br></br>
              {"We are also defined by what we don’t do, and that belongs to anyone that’s willing to make it their."}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            height: "150x",
            mb: "20px",
            p: "15px 34px",
            border: "1px solid",
            borderColor: "primary.main",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              display: "flex"
            }}
          >
            <Typography
              color="primary.main"
              variant="body1"
              component="div"
            > 
              {"More additional extra bonus info."}
            </Typography>
          </CardContent>
        </Card>
      </Box>

    </Box>
  );
};

export default Dashboard;