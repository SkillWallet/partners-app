import { Avatar, Box, Card, CardContent, CardHeader, ThemeOptions, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwButton, SwDivider, TreasurySvg } from 'sw-web-shared';
import { Link } from 'react-router-dom';
import { ReactComponent as MembersCard } from '@partners-assets/member-card.svg';
import { ReactComponent as RolesIcon } from '@partners-assets/roles.svg';
import { RootState } from '@partners-store/store.model';
import { useSelector } from 'react-redux';
import './dashboard.scss';

const Dashboard = () => {
  const largeDevice = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.up('lg'));
  const { community } = useSelector((state: RootState) => state.community);
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
          component={Link}
          to="/analytics/members"
        />
        <SwButton
          sx={{ height: '65px' }}
          startIcon={<RolesIcon className="sw-btn-icon" width="30px" />}
          label="Roles & Skills"
          to="/analytics/roles"
          component={Link}
        />
        <SwButton
          sx={{ height: '65px' }}
          startIcon={<TreasurySvg className="sw-btn-icon" width="30px" />}
          label="Profit-Sharing"
          disabled
          to="/"
        />
      </Box>
      <SwDivider width="1px" orientation={largeDevice ? 'vertical' : 'horizontal'} />
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
              avatar={<Avatar src={community?.image} sx={{ width: 60, height: 60, borderRadius: 0 }} />}
              subheader={
                <Typography color="primary.main" variant="body1">
                  Skills: {community?.skills?.categories?.length}
                </Typography>
              }
              titleTypographyProps={{
                color: 'primary.main',
                variant: 'h2',
              }}
              title={community?.name}
            />
            <CardContent>
              <Typography color="primary.main" variant="body1">
                {community?.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <SwButton disabled sx={{ height: '50px' }} label={community?.template} />
      </Box>
    </div>
  );
};

export default Dashboard;
