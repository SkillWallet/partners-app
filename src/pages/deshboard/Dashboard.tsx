import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { CommunityData } from '@store/Community/community.reducer';
import { pxToRem } from '@utils/text-size';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviusRoute } from '@store/ui-reducer';
import { useEffect } from 'react';
import { UserInfo } from '@auth/auth.reducer';
import SwGrid from '@components/SwGrid';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(UserInfo);
  const community = useSelector(CommunityData);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
  }, [dispatch]);

  return (
    <SwGrid
      left={
        <>
          <Box sx={{ width: '100%', mb: pxToRem(85), mt: pxToRem(20), whiteSpace: 'nowrap' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography textAlign="center" color="primary" component="div" variant="h1" sx={{ mr: 1 }}>
                Welcome to your
              </Typography>
              <Typography textAlign="center" color="primary" variant="h1" sx={{ textDecoration: 'underline' }}>
                Partner Dashboard
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography textAlign="center" color="primary" sx={{ fontSize: pxToRem(25), mr: 1 }}>
                where your Community
              </Typography>
              <Typography textAlign="center" color="primary" sx={{ opacity: '0.5', fontSize: pxToRem(25) }}>
                happens.
              </Typography>{' '}
            </Box>
          </Box>
          <div
            className="sw-user-info"
            style={{
              width: '100%',
              maxWidth: pxToRem(385),
              margin: '0 auto',
            }}
          >
            <Avatar
              className="sw-profile-pic"
              src={userInfo?.imageUrl}
              sx={{
                width: pxToRem(225),
                height: pxToRem(225),
                margin: '0 auto',
              }}
            />
            <Typography sx={{ color: 'primary.main', textAlign: 'center', my: pxToRem(30) }} component="div" variant="h1">
              {userInfo?.nickname}
            </Typography>
            <Typography sx={{ color: 'primary.main', textAlign: 'center', mb: pxToRem(30) }} component="div" variant="h2">
              {userInfo?.isCoreTeamMember ? 'Core Team Member' : 'Community Member'}
            </Typography>
            {/* <Typography sx={{ color: 'primary.main', textAlign: 'center', mb: pxToRem(30) }} component="div" variant="h2">
              Reputation Points: 888
            </Typography> */}
            <Divider sx={{ borderColor: '#000' }} />
            <Typography sx={{ color: 'primary.main', my: pxToRem(30) }} component="div" variant="h2">
              Your open tasks: 20
            </Typography>
            <Typography sx={{ color: 'primary.main', mb: pxToRem(30) }} component="div" variant="h2">
              Total Completed Tasks: 2
            </Typography>
          </div>
        </>
      }
      right={
        <Card
          sx={{
            margin: `${pxToRem(110)} auto ${pxToRem(30)} auto`,
            maxWidth: pxToRem(585),
            width: '100%',
            p: pxToRem(50),
            border: '1px solid',
            borderColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(0, 0, 0, 0.03)',
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  height: pxToRem(65),
                  width: pxToRem(65),
                  mr: pxToRem(50),
                }}
                variant="square"
                src={community?.image as string}
              />
            }
            sx={{
              '.MuiAvatar-root': {
                backgroundColor: 'transparent',
              },
            }}
            title={
              <>
                <Typography sx={{ color: 'primary.main', textDecoration: 'underline' }} component="div" variant="h1">
                  {community?.name}
                </Typography>
                <Typography sx={{ color: 'primary.main' }} component="div" variant="h3">
                  Community Type: {community?.properties?.template}
                </Typography>
              </>
            }
            // titleTypographyProps={{
            //   mx: 'auto',
            //   variant: 'h3',
            //   color: 'primary.main',
            //   mt: '6px',
            // }}
          />
          <CardContent
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography color="primary.main" variant="body1" component="div">
              {community?.description}
            </Typography>
            <Divider sx={{ borderColor: '#000', my: pxToRem(40) }} />
            <Typography sx={{ color: 'primary.main', mb: pxToRem(40) }} component="div" variant="h2">
              Total Number of Members: 20
            </Typography>
            {/* <Typography sx={{ color: 'primary.main', mb: pxToRem(40) }} component="div" variant="h2">
              Number of Core Team: 2
            </Typography>
            <Typography sx={{ color: 'primary.main', mb: pxToRem(40) }} component="div" variant="h2">
              Number of Core Team: 2
            </Typography>
            <Typography sx={{ color: 'primary.main', mb: pxToRem(40) }} component="div" variant="h2">
              Number of Core Team: 2
            </Typography>
            <Typography sx={{ color: 'primary.main', mb: pxToRem(40) }} component="div" variant="h2">
              Number of Core Team: 2
            </Typography> */}
          </CardContent>
        </Card>
      }
    />
  );
};

export default Dashboard;
