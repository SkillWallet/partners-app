import { useEffect, useState } from 'react';

import SvgIcon from '@mui/material/SvgIcon';
import { withRouter, Route, Switch } from 'react-router-dom';
import { SwLayout, SwSidebar, SwMenuItems } from 'sw-web-shared';

import MenuIcon from '@mui/icons-material/Menu';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@partners-store/store.model';
import SWSnackbar from '@partners-components/snackbar';
import { useMediaQuery, ThemeOptions, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import { fetchCommunity } from '@partners-store/Community/community.reducer';
import { ReactComponent as CopyIcon } from '@partners-assets/copy-icon.svg';
import { ReactComponent as DaoStatsIcon } from '@partners-assets/dao-stats.svg';
import { ReactComponent as DashboardIcon } from '@partners-assets/dashboard.svg';
import { ReactComponent as EventBadgeIcon } from '@partners-assets/event-badge.svg';
import Dashboard from './dashboard/Dashboard';
import Members from './members/Members';
import Roles from './roles/Roles';
import './partners.scss';

const Partners = (props: any) => {
  const dispatch = useAppDispatch();
  const { community } = useSelector((state: RootState) => state.community);
  const [opened, setOpened] = useState(true);
  const small = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('md'));

  const { isAutheticated, userInfo } = useSelector((state: RootState) => state.auth);

  const handleToggle = () => setOpened(!opened);

  useEffect(() => {
    if (!community) {
      dispatch(fetchCommunity(userInfo?.community));
    }
  }, [community, dispatch, userInfo]);

  useEffect(() => {
    if (small) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [small]);

  const menuItems: any[] = [
    {
      type: 'href',
      label: 'Dashboard',
      href: '/analytics',
      icon: <SvgIcon component={DashboardIcon} />,
    },
    {
      type: 'href',
      label: 'Event Factory',
      disabled: true,
      href: '/analytics',
      icon: <SvgIcon component={EventBadgeIcon} />,
    },
    {
      type: 'href',
      label: 'DAO Stats',
      href: '/analytics',
      disabled: true,
      icon: <SvgIcon component={DaoStatsIcon} />,
    },
    {
      type: 'href',
      label: 'Your Contracts',
      disabled: true,
      href: '/analytics',
      icon: <SvgIcon component={CopyIcon} />,
    },
  ];

  return (
    <>
      <SWSnackbar />
      <SwLayout
        hideTop
        scrollbarStyles={{ height: '100%' }}
        drawer={
          isAutheticated && (
            <SwSidebar handleToggle={handleToggle} sidebarTopIcon={null} mobile={small} open={opened} mode="dock" preventClose={false}>
              <>
                <div className="sw-user-info">
                  <Avatar
                    className="sw-profile-pic"
                    variant="square"
                    src={userInfo?.imageUrl}
                    sx={{ width: !opened ? 60 : 110, height: !opened ? 60 : 110, border: '2px solid white' }}
                  />
                  <Typography sx={{ color: 'background.paper', textAlign: 'center', my: 2 }} component="div" variant="h1">
                    {userInfo?.nickname}
                  </Typography>
                </div>
                <SwMenuItems handleToggle={() => handleToggle()} mobile={small} open={opened} menuItems={menuItems} />
              </>
            </SwSidebar>
          )
        }
      >
        <div className="sw-menu-icon">
          {small && (
            <Tooltip title="Open sidebar" placement="right" color="white">
              <IconButton className="sw-toolbar-button" color="info" onClick={handleToggle}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <Switch>
          <Route exact path="/analytics/" component={Dashboard} {...props} />
          <Route path="/analytics/members" component={Members} {...props} />
          <Route path="/analytics/roles" component={Roles} {...props} />
        </Switch>
      </SwLayout>
    </>
  );
};

export default withRouter(Partners);
