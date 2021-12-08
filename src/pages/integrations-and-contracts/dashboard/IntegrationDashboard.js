import React from "react";

import Card from "@mui/material/Card";
import {
  Avatar,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

import { ReactComponent as SwAuthIcon } from "../../../assets/sw-auth.svg";
import { ReactComponent as DiscordBotIcon } from "../../../assets/discord-bot.svg";
import { ReactComponent as ContractIcon } from "../../../assets/contract.svg";
import { SwButton } from "sw-web-shared";
import { Link } from "react-router-dom";

const IntegrationCards = [
  {
    icon: SwAuthIcon,
    title: "SkillWallet Auth",
    description: `This is where your DAO lives. Add the URL where you’ll be
        integrating our Decentralized Authentication System using your
        Partner Key.`,
    action: (
      <SwButton
        color="primary"
        component={Link}
        to="/partner/integrations-and-contracts/dao-integration"
        sx={{
          borderColor: "primary.main",
          height: "70px",
        }}
      >
        Set your DAO URL
      </SwButton>
    ),
  },
  {
    icon: DiscordBotIcon,
    title: "Discord Bot",
    description: `Track the Roles and IDs of your Members, create tasks, and turn
    your community into a healthy, motivated collaboration engine!`,
    action: (
      <SwButton
        color="primary"
        sx={{
          borderColor: "primary.main",
          height: "70px",
        }}
        onClick={() => {
          // @TODO: Milena to change the url
          window.open('https://discord.com/api/oauth2/authorize?client_id=898586559228551208&permissions=8&scope=bot', '_blank');
        }}
      >
        Integrate on Discord
      </SwButton>
    ),
  },
  {
    icon: ContractIcon,
    title: "Your Contracts",
    description: `These are the Smart Contracts you’ll be tracking interactions
    with. Make sure you own them, as you will have to sign a
    transaction.`,
    action: (
      <SwButton
        color="primary"
        component={Link}
        to="/partner/integrations-and-contracts/contracts"
        sx={{
          borderColor: "primary.main",
          height: "70px",
        }}
      >
        Track & Add Contracts
      </SwButton>
    ),
  },
];

const IntegrationDashboard = () => {
  return (
    <div className="sw-integration-dashboard">
      <Typography textAlign="center" variant="h1">
        Integrations & Contracts
      </Typography>
      <Typography textAlign="center" sx={{ my: 2 }} variant="h2">
        The Operating System for your DAO
      </Typography>
      <div
        className="sw-cards"
        style={{
          marginTop: "50px",
          padding: 0,
          display: "grid",
          width: "100%",
          gridGap: "55px",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gridAutoRows: "minmax(380px, auto)",
        }}
      >
        {IntegrationCards.map(({ title, icon, description, action }, n) => (
          <div key={n}>
            <Card
              sx={{
                height: "290px",
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
                    component={icon}
                  />
                }
                sx={{
                  ".MuiAvatar-root": {
                    backgroundColor: "transparent",
                  },
                }}
                title={title}
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
                  {description}
                </Typography>

                <Divider
                  sx={{
                    borderColor: "primary.main",
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

export default IntegrationDashboard;
