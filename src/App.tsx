import { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SwLogo } from '@assets/sw-logo-icon.svg';
import Redirect from '@components/Redirect';
import { resetAuthState, setAuthenticated } from '@auth/auth.reducer';
import { Typography } from '@mui/material';
import { RootState } from '@store/store.model';
import Partners from './pages/Partners';
import GetStarted from './pages/get-started/get-started';
import Integrate from './pages/integrate/Integrate';
import SWSnackbar from './components/snackbar';
import './App.scss';

const LoadingMessage = () => (
  <div className="app-loading">
    <SwLogo width="80" height="80" />
  </div>
);

function NoMatch() {
  return (
    <Typography
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="h1"
    >
      Not found!
    </Typography>
  );
}

function App(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const onSWLogin = async ({ detail }: any) => {
      const isLoggedIn = !!detail;
      const sw = JSON.parse(sessionStorage.getItem('skillWallet') || '{}');
      if (isLoggedIn && sw?.isCoreTeamMember) {
        dispatch(
          setAuthenticated({
            isAuthenticated: isLoggedIn,
            userInfo: sw,
          })
        );

        const goTo = props.location.pathname === '/' ? 'partner/dashboard' : props.location.pathname;
        props.history.push(goTo);
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
  }, [dispatch, props.history, props.location.pathname]);

  const isIntegrateFlow = props?.location?.pathname?.endsWith('integrate');

  return (
    <>
      <SWSnackbar />
      <div className={isLoading ? 'sw-loading' : ''}>
        <div
          className="connect-wallet-container"
          style={{
            // visibility: isIntegrateFlow ? "hidden" : "visible",
            top: isIntegrateFlow ? '-2000px' : '45px',
          }}
        >
          {/* @ts-ignore */}
          <skillwallet-auth allow-create-new-user="true" partner-key="685a1fd74240ae4216c4bd384dba56e498be8bc4" />
        </div>
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <Switch>
            <Route exact component={GetStarted} path="/" {...props} />
            <Route path="/integrate" component={Integrate} {...props} />
            <Route path="/redirect" component={Redirect} {...props} />
            {isAutheticated && <Route path="/partner" component={Partners} {...props} />}
            <Route path="*" component={NoMatch} />
          </Switch>
        )}
      </div>
    </>
  );
}

export default withRouter(App);
