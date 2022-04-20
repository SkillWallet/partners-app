import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { SwScrollbar } from 'sw-web-shared';
import { AppBar, Button, Collapse, Container, CssBaseline, SvgIcon, Toolbar, useTheme } from '@mui/material';
import { ReactComponent as CoreTeam } from '@assets/core-team.svg';
import { ReactComponent as Community } from '@assets/community.svg';
import { ReactComponent as Network } from '@assets/dao-management.svg';
import { ReactComponent as DaoStatsIcon } from '@assets/dao-stats.svg';
import { ReactComponent as DashboardIcon } from '@assets/dashboard.svg';
import { ReactComponent as VideoIcon } from '@assets/video.svg';
import { ReactComponent as GraphIcon } from '@assets/graph.svg';
import { ReactComponent as Tasks } from '@assets/tasks.svg';
import { ReactComponent as YourTasks } from '@assets/your-tasks.svg';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { ReactComponent as EventFactoryIcon } from '@assets/event-badge.svg';
import { ReactComponent as IntegrationIcon } from '@assets/integration.svg';
import { ReactComponent as Coins } from '@assets/coins.svg';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Fragment } from 'react';
import { pxToRem } from '@utils/text-size';
import { KeyboardArrowLeft } from '@mui/icons-material';

// const menuItems = [
//   {
//     type: 'href',
//     label: 'Dashboard',
//     href: '/partner/dashboard',
//     icon: <SvgIcon component={DashboardIcon} />,
//   },
//   {
//     type: 'href',
//     label: 'Integrations & Contracts',
//     href: '/partner/integrations-and-contracts',
//     icon: <SvgIcon component={IntegrationIcon} />,
//   },
//   {
//     type: 'href',
//     label: 'Event Factory',
//     href: '/partner/event-factory',
//     icon: <SvgIcon component={EventFactoryIcon} />,
//   },
//   {
//     type: 'href',
//     label: 'DAO Stats',
//     href: '/core-team',
//     disabled: true,
//     icon: <SvgIcon component={DaoStatsIcon} />,
//   },
// ];

const menuItems: any[] = [
  {
    title: 'Dashboard',
    route: '/partner/dashboard',
    icon: Network,
    children: [
      {
        title: '- Core Team',
        route: '/partner/core-team',
        icon: CoreTeam,
      },
      {
        title: '- Community',
        route: '/partner/community',
        icon: Community,
      },
    ],
  },
  {
    title: 'Integrations & Contracts',
    route: '/partner/integrations-and-contracts',
    icon: IntegrationIcon,
  },
  {
    title: 'Event Factory',
    route: '/partner/event-factory',
    icon: EventFactoryIcon,
  },
  {
    title: 'Tasks',
    route: '/partner/tasks',
    icon: Tasks,
    children: [
      {
        title: '- All Tasks',
        route: '/partner/tasks',
        icon: EditIcon,
      },
      {
        title: '- Your Tasks',
        route: '/partner/your-tasks',
        icon: YourTasks,
      },
    ],
  },
  {
    title: (
      <>
        Rewards <br /> (coming soon)
      </>
    ),
    route: '/partner/rewards',
    disabled: true,
    icon: Coins,
  },
  {
    title: (
      <>
        DAO Stats <br /> (coming soon)
      </>
    ),
    route: '/partner/dao-stats',
    disabled: true,
    icon: DaoStatsIcon,
  },
];

const drawerWidth = 350;

export default function SidebarDrawer({ children }) {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: pxToRem(drawerWidth),
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { backgroundColor: '#000', border: '0', width: pxToRem(drawerWidth) },
        }}
      >
        {/* <div className="sw-user-info">
          <Avatar
            className="sw-profile-pic"
            src={userInfo?.imageUrl}
            sx={{
              width: !opened ? 60 : 87,
              height: !opened ? 60 : 87,
              border: '2px solid white',
            }}
          />
          <Typography sx={{ color: 'background.paper', textAlign: 'center', my: 2 }} component="div" variant="h1">
            {userInfo?.nickname}
          </Typography>
        </div> */}
        <Box
          sx={{
            m: pxToRem(35),
            p: pxToRem(20),
            flex: 1,
            border: '1px solid #fff',
          }}
        >
          <List
            sx={{
              width: '100%',
              mt: pxToRem(0),
              '.main-menu-item:not(:first-child)': {
                marginTop: pxToRem(20),
              },
            }}
            component="nav"
          >
            {menuItems.map((menu, index) => {
              const routeParams = menu.disabled
                ? {}
                : {
                    component: NavLink,
                    activeClassName: 'active-group-link',
                    to: menu.route,
                  };
              return (
                <Fragment key={`menu-item-${menu.title}-${index}`}>
                  <ListItem
                    className="main-menu-item"
                    sx={{
                      py: pxToRem(10),
                      height: pxToRem(60),
                      paddingTop: 0,
                      paddingBottom: 0,
                      borderWidth: '1px',
                      borderColor: '#fff',
                      borderStyle: 'solid',
                      backgroundColor: '#fff',
                      ...(menu.children?.length && {
                        borderBottomWidth: 0,
                      }),
                      '+ .MuiCollapse-root': {
                        '.MuiListItem-root': {
                          borderTopColor: '#000',
                        },
                      },
                      '&.active-group-link': {
                        backgroundColor: 'primary.main',
                        borderColor: '#fff',
                        '.MuiTypography-root, .MuiListItemIcon-root': {
                          color: 'text.primary',
                        },
                      },
                    }}
                    disabled={menu.disabled}
                    {...routeParams}
                  >
                    <ListItemIcon
                      sx={{
                        pr: 2,
                        minWidth: 'auto',
                        color: '#000',
                      }}
                    >
                      <SvgIcon
                        sx={{
                          height: pxToRem(19),
                          width: pxToRem(19),
                        }}
                        component={menu.icon}
                        inheritViewBox
                      />
                    </ListItemIcon>
                    <Typography color="primary" component="div" variant="h3">
                      {menu.title}
                    </Typography>
                  </ListItem>
                  {menu.children && (
                    <Collapse
                      // sx={{
                      //   border: 0,
                      //   borderLeft: '1px',
                      //   borderRight: '1px',
                      //   borderBottom: '1px',
                      //   borderStyle: 'solid',
                      //   borderColor: '#000',
                      // }}
                      in
                      // timeout="auto"
                      // unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {menu.children.map((childMenu, childIndex) => {
                          return (
                            <ListItem
                              sx={{
                                py: pxToRem(10),
                                height: pxToRem(40),
                                backgroundColor: '#fff',
                                paddingTop: 0,
                                paddingBottom: 0,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'transparent',
                                pl: pxToRem(50),
                                '&.active-link': {
                                  backgroundColor: 'primary.main',
                                  borderColor: '#fff !important',
                                  '.MuiTypography-root, .MuiListItemIcon-root': {
                                    color: 'text.primary',
                                  },
                                },
                              }}
                              component={NavLink}
                              activeClassName="active-link"
                              to={childMenu.route}
                              key={`child-menu-item-${childMenu.title}-${childIndex}`}
                            >
                              <ListItemIcon
                                sx={{
                                  pr: 2,
                                  minWidth: 'auto',
                                  color: '#000',
                                }}
                              >
                                <SvgIcon
                                  sx={{
                                    height: pxToRem(19),
                                    width: pxToRem(19),
                                  }}
                                  component={childMenu.icon}
                                  inheritViewBox
                                />
                              </ListItemIcon>
                              <Typography sx={{ color: 'primary.main' }} component="div" variant="h3">
                                {childMenu.title}
                              </Typography>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </Fragment>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          height: `calc(100%)`,
          ml: pxToRem(drawerWidth),
          // mt: pxToRem(84),
          flexGrow: 1,
          p: '0',
        }}
      >
        <Box
          sx={{
            mx: pxToRem(24),
            my: pxToRem(24),
            width: `calc(100% - ${pxToRem(50)})`,
            height: `calc(100% - ${pxToRem(50)})`,
            border: '1px solid #000',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AppBar
            sx={{
              background: '#FFF',
              border: 0,
            }}
            elevation={0}
            position="static"
          >
            <Toolbar sx={{ height: `${pxToRem(84)} !important`, justifyContent: 'space-between' }}>
              <div className="back-button">
                <Button onClick={() => history.goBack()} size="small" color="primary">
                  <KeyboardArrowLeft sx={{ height: pxToRem(35), width: pxToRem(35) }} />
                  Back
                </Button>
              </div>
            </Toolbar>
          </AppBar>

          <SwScrollbar
            sx={{
              height: `calc(100% - ${pxToRem(84)})`,
              flex: 1,
              p: 0,
            }}
          >
            <Container
              className="main-container"
              maxWidth={false}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              disableGutters
            >
              {children}
            </Container>
          </SwScrollbar>
        </Box>
      </Box>
    </>
  );
}
