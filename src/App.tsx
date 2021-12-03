import { useEffect, useState } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { SwLayout } from 'sw-web-shared';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@partners-store/store.model';
import SWSnackbar from '@partners-components/snackbar';
import { Typography } from '@mui/material';
import { ReactComponent as SwLogo } from '@partners-assets/sw-logo.svg';
import { resetAuthState, setAuthenticated } from './auth/auth.reducer';

import Integrate from './pages/integrate/Integrate';
import Redirect from './components/Redirect';
import GetStarted from './pages/get-started/get-started';
import Partners from './pages/partners/Partners';

import './styles/App.scss';

const LoadingMessage = () => (
  <div className="app-loading">
    <SwLogo width="80" height="80" />
  </div>
);

function NoMatch() {
  return (
    <Typography
      color="background.paper"
      sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      variant="h1"
    >
      Comming soon!
    </Typography>
  );
}

const App = (props: any) => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true);
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const onSWLogin = async ({ detail }: any) => {
      const isLoggedIn = !!detail;
      const sw = JSON.parse(sessionStorage.getItem('skillWallet') || '{}');

      // && sw.isCoreTeamMember
      if (isLoggedIn && sw) {
        dispatch(
          setAuthenticated({
            isAuthenticated: isLoggedIn,
            userInfo: sw,
          })
        );
      } else {
        dispatch(resetAuthState());
        props.history.push('/');
      }
    };
    const onSWInit = async () => setLoading(false);
    window.addEventListener('initSkillwalletAuth', onSWInit);
    window.addEventListener('onSkillwalletLogin', onSWLogin);

    return () => {
      window.removeEventListener('initSkillwalletAuth', onSWInit);
      window.removeEventListener('onSkillwalletLogin', onSWLogin);
    };
  }, [isAutheticated, dispatch, props.history]);

  return (
    <>
      <SWSnackbar />
      <div className="sw-auth-component">
        {/* @ts-ignore */}
        <skillwallet-auth id="walletButton" />
      </div>
      <SwLayout
        hideTop
        className={isLoading ? 'loading' : ''}
        scrollbarStyles={{ height: '100%' }}
        top={null}
        backgroundUrl={null}
        drawer={null}
        disableGutters
      >
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <Switch>
            <Route exact component={GetStarted} path="/" {...props} />
            <Route path="/integrate" component={Integrate} {...props} />
            <Route path="/redirect" component={Redirect} {...props} />
            {isAutheticated && <Route path="/analytics" component={Partners} {...props} />}
            <Route path="*" component={NoMatch} />
          </Switch>
        )}
      </SwLayout>
    </>
  );
};

export default withRouter(App);
