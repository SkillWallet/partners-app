import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, Divider, Typography } from '@mui/material';

import { SwButton } from 'sw-web-shared';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { memo, useEffect } from 'react';

import { ReactComponent as VideoIcon } from '@assets/video.svg';
import { ReactComponent as GraphIcon } from '@assets/graph.svg';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';

const EventDashboardCards = [
  {
    icon: EditIcon,
    title: 'Open Task',
    description: `Lorem Ipsum is simply dummy text of the printing
     and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown
       printer took a galley of type and scrambled it to make
        a type specimen book.`,
    action: (
      <SwButton mode="light" sx={{ height: '70px' }} component={Link} to="/partner/event-factory/create-task">
        Open Task
      </SwButton>
    ),
  },
  {
    icon: VideoIcon,
    title: 'Group Calls',
    description: `Lorem Ipsum is simply dummy text of the printing
    and typesetting industry. Lorem Ipsum has been the industry's
     standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to make
       a type specimen book.`,
    action: (
      <SwButton mode="light" sx={{ height: '70px' }} component={Link} to="/partner/event-factory/group-call">
        Group Call
      </SwButton>
    ),
  },
  {
    icon: GraphIcon,
    title: 'Polls & Proposals',
    description: `Lorem Ipsum is simply dummy text of the printing
    and typesetting industry. Lorem Ipsum has been the industry's
     standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to make
       a type specimen book.`,
    action: (
      <SwButton mode="light" disabled sx={{ height: '70px' }} component={Link} to="/partner/dashboard">
        Polls & Proposals
      </SwButton>
    ),
  },
];

const EventFactoryDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
    console.log('Previous route from Event Factory dashboard');
  }, [dispatch]);

  return (
    <div className="sw-integration-dashboard">
      <Typography textAlign="center" variant="h1">
        Welcome to your Events Factory
      </Typography>
      <Typography textAlign="center" sx={{ my: 2 }} variant="h2">
        Create tasks and turn your DAO into a collaboration engine
      </Typography>
      <div
        className="sw-cards"
        style={{
          marginTop: '50px',
          padding: 0,
          display: 'grid',
          width: '100%',
          gridGap: '55px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gridAutoRows: 'minmax(380px, auto)',
        }}
      >
        {EventDashboardCards.map(({ title, icon, description, action }, n) => (
          <div key={n}>
            <Card
              sx={{
                height: '290px',
                mb: '20px',
                p: '15px 34px',
                border: '1px solid',
                borderColor: 'primary.main',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      height: '27px',
                    }}
                    variant="square"
                    component={icon}
                  />
                }
                sx={{
                  '.MuiAvatar-root': {
                    backgroundColor: 'transparent',
                  },
                }}
                title={title}
                titleTypographyProps={{
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
                  {description}
                </Typography>

                <Divider
                  sx={{
                    borderColor: 'primary.main',
                  }}
                />
              </CardContent>
            </Card>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(EventFactoryDashboard);
