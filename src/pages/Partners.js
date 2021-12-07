import { useEffect, useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { Route, Switch } from "react-router-dom";
import { SwLayout, SwSidebar, SwMenuItems } from "sw-web-shared";
import MenuIcon from "@mui/icons-material/Menu";
import {
  useMediaQuery,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import { ReactComponent as DaoStatsIcon } from "../assets/dao-stats.svg";
import { ReactComponent as DashboardIcon } from "../assets/dashboard.svg";
import { ReactComponent as IntegrationIcon } from "../assets/integration.svg";
import { ReactComponent as EventFactoryIcon } from "../assets/event-badge.svg";
import CoreTeam from "../components/core-team/CoreTeam";
import CoreTeamMenu from "../pages/core-team/CoreTeam";
import "./partners.scss";
import Contracts from "../components/integrations-and-contracts/contracts/Contracts";
import Dashboard from "./deshboard/Dashboard";
import DaoIntegration from "../components/integrations-and-contracts/integrations/dao/DaoIntegration";
import IntegrationDashboard from "../components/integrations-and-contracts/dashboard/IntegrationDashboard";
import MembersAndActivities from "../components/member-and-activities/MembersAndActivities";

function NoMatch() {
  return (
    <Typography
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      variant="h1"
    >
      Comming soon!
    </Typography>
  );
}

const Partners = (props) => {
  const [opened, setOpened] = useState(true);
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleToggle = () => setOpened(!opened);
  const sw = JSON.parse(window.sessionStorage.getItem("skillWallet") || "{}");

  useEffect(() => {
    if (small) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [small]);

  const menuItems = [
    {
      type: "href",
      label: "Dashboard",
      href: "/partner/dashboard",
      icon: <SvgIcon component={DashboardIcon} />,
    },
    {
      type: "href",
      label: "Integrations & Contracts",
      href: "/partner/integrations-and-contracts",
      icon: <SvgIcon component={IntegrationIcon} />,
    },
    {
      type: "href",
      label: "Event Factory",
      href: "/core-team",
      icon: <SvgIcon component={EventFactoryIcon} />,
    },
    {
      type: "href",
      label: "DAO Stats",
      href: "/core-team",
      disabled: true,
      icon: <SvgIcon component={DaoStatsIcon} />,
    },
    
  ];

  return (
    <>
      <SwLayout
        hideTop
        disableGutters
        scrollbarStyles={{ height: "100%" }}
        drawer={
          <SwSidebar
            handleToggle={handleToggle}
            sidebarTopIcon={null}
            mobile={small}
            open={opened}
            mode="dock"
            width="230px"
            preventClose={false}
            sx={{
              backgroundColor: "black",
            }}
          >
            <>
              <div className="sw-user-info">
                <Avatar
                  className="sw-profile-pic"
                  src={sw?.imageUrl}
                  sx={{
                    width: !opened ? 60 : 87,
                    height: !opened ? 60 : 87,
                    border: "2px solid white",
                  }}
                />
                <Typography
                  sx={{ color: "background.paper", textAlign: "center", my: 2 }}
                  component="div"
                  variant="h1"
                >
                  {sw?.nickname}
                </Typography>
              </div>
              <SwMenuItems
                handleToggle={handleToggle}
                mobile={small}
                open={opened}
                menuItems={menuItems}
              />
            </>
          </SwSidebar>
        }
      >
        <div className="sw-menu-icon">
          {small && (
            <Tooltip title="Open sidebar" placement="right" color="white">
              <IconButton
                className="sw-toolbar-button"
                color="info"
                onClick={handleToggle}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <Switch>
          <Route path="/partner/dashboard">
            <Route
              path={`/`}
              render={(e) => {
                switch (e.location.pathname) {
                  case "/partner/dashboard/core-team":
                    return <CoreTeam {...props} />;
                  case "/partner/dashboard/core":
                    return <CoreTeamMenu {...props} />;
                  case "/partner/dashboard/members": 
                    return <MembersAndActivities {...props} isCoreTeamMembers/>
                  default:
                    return <Dashboard {...props} />;
                }
              }}
            />
          </Route>

          <Route path="/partner/integrations-and-contracts">
            <Route
              path={`/`}
              render={(e) => {
                switch (e.location.pathname) {
                  case "/partner/integrations-and-contracts/contracts":
                    return <Contracts {...props} />;
                  case "/partner/integrations-and-contracts/dao-integration":
                    return <DaoIntegration {...props} />;
                  default:
                    return <IntegrationDashboard {...props} />;
                }
              }}
            />
          </Route>
        </Switch>
      </SwLayout>
    </>
  );
};

export default Partners;
