import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { useEffect } from 'react';
import { ReactComponent as VideoIcon } from '@assets/video.svg';
import { ReactComponent as GraphIcon } from '@assets/graph.svg';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import './EventFactoryDashboard.scss';

const EventFactoryDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
    console.log('Previous route from Event Factory dashboard');
  }, [dispatch]);

  return (
    <Box
      className="sw-factory-dashboard-wrapper"
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="sw-box"
      >
        <Box sx={{ pb: 'auto' }}>
          <Typography textAlign="center" component="div" variant="h1">
            Welcome to your Interaction Factory <br />
            <small> Create Tasks, and turn your DAO into a collaboration engine 🚀</small>
          </Typography>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            flex: 1,
            display: 'flex',
            width: '350px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gridGap: '20px',
          }}
        >
          <SwButton
            mode="light"
            btnType="large"
            endIcon={<EditIcon />}
            label="Open Task"
            component={Link}
            to="/partner/event-factory/create-task"
          />
          <SwButton
            disabled
            mode="light"
            btnType="large"
            endIcon={<VideoIcon />}
            label="Group Calls"
            component={Link}
            to="/partner/event-factory/group-call"
          />
          <SwButton
            mode="light"
            btnType="large"
            disabled
            endIcon={<GraphIcon />}
            label="Polls & Proposals"
            component={Link}
            to="/partner/dashboard"
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          my: 'auto',
        }}
      >
        <Card
          sx={{
            height: '313px',
            width: '415px',
            mb: '20px',
            p: '40px',
            border: '1px solid',
            borderColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.dark',
          }}
        >
          <CardHeader
            sx={{
              '.MuiAvatar-root': {
                backgroundColor: 'transparent',
              },
            }}
            title="Title"
            titleTypographyProps={{
              mx: 'auto',
              align: 'center',
              variant: 'h3',
              color: 'primary.main',
              mt: '6px',
            }}
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
              This is a brilliant, informative text - detailing what tasks are for, how they reflect Blockchain events, and can be easily
              shared on Discord to involve the Community, and reward the most active participants in a meritocratic way.
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            border: '1px solid',
            width: '412px',
            borderColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardHeader
            titleTypographyProps={{
              variant: 'h3',
              color: 'primary.main',
            }}
            title="Events History"
          />
        </Card>
      </Box>
    </Box>
  );
};

export default EventFactoryDashboard;
