import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, Container, Divider, Typography } from '@mui/material';

import { SwButton } from 'sw-web-shared';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { memo, useEffect } from 'react';
import { ReactComponent as SwAuthIcon } from '@assets/sw-auth.svg';
import { ReactComponent as DiscordBotIcon } from '@assets/discord-bot.svg';
import { ReactComponent as ContractIcon } from '@assets/contract.svg';

const IntegrationCards = [
  {
    icon: SwAuthIcon,
    title: 'SkillWallet Auth',
    description: `This is where your DAO lives. Add the URL where you’ll be
        integrating our Decentralized Authentication System using your
        Partner Key.`,
    action: (
      <SwButton mode="light" sx={{ height: '70px' }} component={Link} to="/partner/integrations-and-contracts/dao-integration">
        Set your DAO URL
      </SwButton>
    ),
  },
  {
    icon: DiscordBotIcon,
    title: 'Discord Bot',
    description: `Manage your Tasks and let your community contribute - directly from your Discord Server.
    SkillWallet's Discord Bot is a bridge between Web2 and Web3 - to track like a wizard, and react like a 🧙`,
    action: (
      <SwButton mode="light" sx={{ height: '70px' }} component={Link} to="/partner/integrations-and-contracts/discord-integration">
        Integrate on Discord
      </SwButton>
    ),
  },
  {
    icon: ContractIcon,
    title: 'Your Contracts',
    description: `These are the Smart Contracts you’ll be tracking interactions
    with. Make sure you own them, as you will have to sign a
    transaction.`,
    action: (
      <SwButton mode="light" disabled sx={{ height: '70px' }} component={Link} to="/partner/integrations-and-contracts/contracts">
        Track & Add Contracts
      </SwButton>
    ),
  },
];

const IntegrationDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
    console.log('Previous route from Integrations Dashboard');
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className="sw-integration-dashboard">
      <Typography color="primary" textAlign="center" variant="h1">
        Integrations & Contracts
      </Typography>
      <Typography color="primary" textAlign="center" sx={{ my: 2 }} variant="h2">
        The Operating System for your DAO
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
        {IntegrationCards.map(({ title, icon, description, action }, n) => (
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
    </Container>
  );
};

export default memo(IntegrationDashboard);
