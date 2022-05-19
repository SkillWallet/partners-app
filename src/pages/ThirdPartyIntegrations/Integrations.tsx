import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { ReactComponent as SwAuthIcon } from '@assets/sw-auth.svg';
import { ReactComponent as DiscordBotIcon } from '@assets/discord-bot.svg';
import { ReactComponent as ContractIcon } from '@assets/contract.svg';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';

const IntegrationCards = [
  {
    icon: SwAuthIcon,
    title: 'SkillWallet Auth',
    description: `This is where your DAO lives. Add the URL where you’ll be
        integrating our Decentralized Authentication System using your
        Partner Key.`,
    action: (
      <PartnerButton
        mode="light"
        btnStyles={{ width: pxToRem(395), height: pxToRem(100), fontSize: pxToRem(28) }}
        component={Link}
        to="/partner/integrations-and-contracts/dao-integration"
      >
        Set your DAO URL
      </PartnerButton>
    ),
  },
  {
    icon: DiscordBotIcon,
    title: 'Discord Bot',
    description: `Manage your Tasks and let your community contribute - directly from your Discord Server.
    SkillWallet's Discord Bot is a bridge between Web2 and Web3 - to track like a wizard, and react like a 🧙`,
    action: (
      <PartnerButton
        mode="light"
        btnStyles={{ width: pxToRem(395), height: pxToRem(100), fontSize: pxToRem(28) }}
        component={Link}
        to="/partner/integrations-and-contracts/discord-integration"
      >
        Integrate on Discord
      </PartnerButton>
    ),
  },
  {
    icon: ContractIcon,
    title: 'Your Contracts',
    description: `These are the Smart Contracts you’ll be tracking interactions
    with. Make sure you own them, as you will have to sign a
    transaction.`,
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
        disabled
        component={Link}
        to="/partner/integrations-and-contracts/contracts"
      >
        Track & Add Contracts
      </PartnerButton>
    ),
  },
];

const Integrations = () => {
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
        Integrations & Contracts
      </Typography>
      <Typography
        sx={{
          mb: pxToRem(50),
        }}
        fontSize={pxToRem(25)}
        color="primary.main"
        textAlign="center"
      >
        The Operating System for your DAO
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

export default memo(Integrations);
