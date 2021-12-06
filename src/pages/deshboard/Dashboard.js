import { Avatar, Box, Card, CardContent, CardHeader, ThemeOptions, Typography } from '@mui/material'; 
import { SwButton, TreasurySvg } from 'sw-web-shared';
import { ReactComponent as MembersCard } from '../../assets/member-card.svg';
import { ReactComponent as RolesIcon } from '../../assets/roles.svg';
import './dashboard.scss';

const Dashboard = () => { 
  return (
    <div className="sw-dashboard-container">
      <Box
        sx={{
          p: 0,
          m: 0,
          gridGap: '30px',
        }}
        className="sw-box"
      >
        <Typography sx={{ color: 'text.primary', textAlign: 'center', pb: 2 }} component="div" variant="h1">
          Welcome to your Partner Dashboard <br />
          <small>where your Community happens.</small>
        </Typography>

        <SwButton
          sx={{ height: '65px' }}
          startIcon={<MembersCard className="sw-btn-icon" width="30px" />}
          label="Membership IDs" 
        />
        <SwButton
          sx={{ height: '65px' }}
          startIcon={<RolesIcon className="sw-btn-icon" width="30px" />}
          label="Roles & Skills" 
        />
        <SwButton
          sx={{ height: '65px' }}
          startIcon={<TreasurySvg className="sw-btn-icon" width="30px" />}
          label="Profit-Sharing"
          disabled 
        />
      </Box> 
      <Box
        sx={{
          p: 0,
          m: 0,
          gridGap: '20px',
        }}
        className="sw-box"
      >
        <Box>
          <Card sx={{ bgcolor: 'text.primary' }}>
            <CardHeader
              avatar={<Avatar src={"HAHAHA"} sx={{ width: 60, height: 60, borderRadius: 0 }} />}
              subheader={
                <Typography color="primary.main" variant="body1">
                  Skills: {"HAHAHA"}
                </Typography>
              }
              titleTypographyProps={{
                color: 'primary.main',
                variant: 'h2',
              }}
              title={"HAHAHA"}
            />
            <CardContent>
              <Typography color="primary.main" variant="body1">
                {"HAHAHA"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <SwButton disabled sx={{ height: '50px' }} label={"HAHAHAH"} />
      </Box>
    </div>
  );
};

export default Dashboard;