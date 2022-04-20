/* eslint-disable max-len */
import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { memo, useEffect } from 'react';
import { ReactComponent as VideoIcon } from '@assets/video.svg';
import { ReactComponent as GraphIcon } from '@assets/graph.svg';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';

const IntegrationCards = [
  {
    icon: EditIcon,
    title: 'Open Task',
    description: `Customizable format for a Task about anything community-related. Can be assigned to Core Team or Community Members. Lives & gets tracked on the Blockchain.`,
    action: (
      <PartnerButton
        mode="light"
        btnStyles={{
          '.sw-btn-label': {
            textAlign: 'center',
          },
          width: pxToRem(395),
          height: pxToRem(100),
          fontSize: pxToRem(28),
        }}
        component={Link}
        to="/partner/event-factory/create-task"
      >
        Open Task
      </PartnerButton>
    ),
  },
  {
    icon: VideoIcon,
    title: 'Group Calls',
    description: `Create a Community call for your Discord Server, and deploy it as a trackable Blockchain event. Assign it to a specific role, or all members of the community - and customize its duration!`,
    action: (
      <PartnerButton
        mode="light"
        btnStyles={{
          '.sw-btn-label': {
            textAlign: 'center',
          },
          width: pxToRem(395),
          height: pxToRem(100),
          fontSize: pxToRem(28),
        }}
        component={Link}
        to="/partner/event-factory/group-call"
      >
        Group Call
      </PartnerButton>
    ),
  },
  {
    icon: GraphIcon,
    title: 'Polls & Proposals',
    description: `Fair, Role-based Governance decision making - based on members roles & reputation. Polls & Proposals done right. Directly on Discord, with Emojis - and reflected on-chain 🙂  `,
    action: (
      <PartnerButton
        mode="light"
        btnStyles={{
          p: 0,
          '.sw-btn-label': {
            textAlign: 'center',
          },
          width: pxToRem(395),
          height: pxToRem(100),
          fontSize: pxToRem(28),
        }}
        component={Link}
        to="/partner/event-factory/polls"
      >
        Polls & Proposals
      </PartnerButton>
    ),
  },
];

const EventFactory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
    console.log('Previous route from Integrations Dashboard');
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className="sw-integration-dashboard">
      <Typography
        sx={{
          textDecoration: 'underline',
          mt: pxToRem(20),
        }}
        fontSize={pxToRem(50)}
        color="primary.main"
        textAlign="center"
      >
        Welcome to your Events Factory
      </Typography>
      <Typography
        sx={{
          mb: pxToRem(50),
        }}
        fontSize={pxToRem(25)}
        color="primary.main"
        textAlign="center"
      >
        Create Tasks, and turn your DAO into a collaboration engine 🚀
      </Typography>
      <Grid container justifyContent="space-around" alignItems="center" spacing={5}>
        {IntegrationCards.map(({ title, icon, description, action }, n) => (
          <Grid item key={n}>
            <Card
              sx={{
                height: pxToRem(470),
                width: pxToRem(400),
                mb: pxToRem(35),
                p: pxToRem(45),
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
                  p: 0,
                  mb: pxToRem(50),
                  '.MuiAvatar-root': {
                    backgroundColor: 'transparent',
                  },
                }}
                title={title}
                titleTypographyProps={{
                  fontSize: pxToRem(25),
                  color: 'primary.main',
                  mt: '6px',
                }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  p: 0,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography color="primary.main" fontSize={pxToRem(22)} component="div">
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default memo(EventFactory);
