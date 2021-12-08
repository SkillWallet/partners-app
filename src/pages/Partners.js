import { useEffect, useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { Route, Switch, useHistory } from "react-router-dom";
import { SwLayout, SwSidebar, SwMenuItems } from "sw-web-shared";
import MenuIcon from "@mui/icons-material/Menu";
import {
  useMediaQuery,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { ReactComponent as DaoStatsIcon } from "@assets/dao-stats.svg";
import { ReactComponent as DashboardIcon } from "@assets/dashboard.svg";
import { ReactComponent as IntegrationIcon } from "@assets/integration.svg";
import { ReactComponent as EventFactoryIcon } from "@assets/event-badge.svg";
import { KeyboardArrowLeft } from "@mui/icons-material";
import CoreTeam from "./core-team/CoreTeam";
import Community from "./community/Community";
import Contracts from "./integrations-and-contracts/contracts/Contracts";
import Dashboard from "./deshboard/Dashboard";
import DaoIntegration from "./integrations-and-contracts/dao-integration/DaoIntegration";
import IntegrationDashboard from "./integrations-and-contracts/dashboard/IntegrationDashboard";
import MembersAndActivities from "@components/member-and-activities/MembersAndActivities";
import CoreTeamWhitelist from "./core-team/core-team-whitelist/CoreTeamWhitelist";
import Roles from "@components/roles/Roles";
import "./partners.scss";

const CoreTeamRoutes = (e, props) => {
  const coreTeamPath = "/partner/dashboard/core-team";
  switch (e.location.pathname) {
    case `${coreTeamPath}/whitelist`:
      return <CoreTeamWhitelist {...props} />;
    case `${coreTeamPath}/members`:
      return <MembersAndActivities {...props} isCoreTeamMembers />;
    case `${coreTeamPath}/roles`:
      return <Roles {...props} isCoreTeam/>;
    default:
      return <CoreTeam {...props} />;
  }
};

const CommunityRoutes = (e, props) => {
  const coreTeamPath = "/partner/dashboard/community";
  switch (e.location.pathname) {
    case `${coreTeamPath}/members`:
      return <MembersAndActivities {...props} />;
    case `${coreTeamPath}/roles`:
      return <Roles {...props} />;
    default:
      return <Community {...props} />;
  }
};

const IntegrationAndContractsRoutes = (e, props) => {
  const coreTeamPath = "/partner/integrations-and-contracts";
  switch (e.location.pathname) {
    case `${coreTeamPath}/contracts`:
      return <Contracts {...props} />;
    case `${coreTeamPath}/dao-integration`:
      return <DaoIntegration {...props} />;
    default:
      return <IntegrationDashboard {...props} />;
  }
};

const Partners = (props) => {
  const [opened, setOpened] = useState(true);
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const history = useHistory();

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
        sx={{
          backgroundColor: 'background.paper'
        }}
        scrollbarStyles={{
          margin: "24px",
          width: "auto",
          padding: "70px",
          border: "2px solid",
          height: "calc(100% - 48px)",
        }}
        drawer={
          <SwSidebar
            className="parner"
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
        <div className="back-button">
          <Button onClick={history.goBack} size="small" color="primary">
            <KeyboardArrowLeft sx={{ marginTop: "-3px" }} />
            Back
          </Button>
        </div>

        <Switch>
          <Route
            path="/partner/dashboard"
            render={(e) => {
              if (e.location.pathname.includes("/dashboard/core-team")) {
                return CoreTeamRoutes(e, props);
              }
              if (e.location.pathname.includes("/dashboard/community")) {
                return CommunityRoutes(e, props);
              }
              return <Dashboard {...props} />;
            }}
          ></Route>

          <Route
            path="/partner/integrations-and-contracts"
            render={(e) => IntegrationAndContractsRoutes(e, props)}
          ></Route>
        </Switch>
      </SwLayout>
    </>
  );
};

export default Partners;
