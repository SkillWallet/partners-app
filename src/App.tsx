import { useEffect, useState } from 'react';
import { withRouter, Switch, Route, Redirect as RedirectRoute, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SwLogo } from '@assets/sw-logo-icon.svg';
import Redirect from '@components/Redirect';
import { resetAuthState, setAuthenticated } from '@auth/auth.reducer';
import { RootState } from '@store/store.model';
import NotFound from '@components/NotFound';
import Partners from './pages/Partners';
import GetStarted from './pages/get-started/get-started';
import SWSnackbar from './components/snackbar';
import PartnerIntegration from './pages/integrate/PartnerIntegration';
import './App.scss';

const LoadingMessage = () => (
  <div className="app-loading">
    <SwLogo width="80" height="80" />
  </div>
);

function App(props) {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const history = useHistory();
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

        const shouldGoToDashboard = location.pathname === '/' || location.pathname === '/integrate';
        const goTo = shouldGoToDashboard ? 'partner/dashboard' : location.pathname;

        const returnUrl = location.state?.from;
        history.push(returnUrl || goTo);
      } else {
        dispatch(resetAuthState());
        history.push('/');
      }
    };

    const onSWInit = async () => setLoading(false);

    window.addEventListener('initSkillwalletAuth', onSWInit);
    window.addEventListener('onSkillwalletLogin', onSWLogin);

    return () => {
      window.removeEventListener('initSkillwalletAuth', onSWInit);
      window.removeEventListener('onSkillwalletLogin', onSWLogin);
    };
  }, [dispatch, history, location.pathname, location.state?.from]);

  // const isIntegrateFlow = props?.location?.pathname?.includes('integrate');

  return (
    <>
      <SWSnackbar />
      <div className={isLoading ? 'sw-loading' : ''}>
        <div className="connect-wallet-container">
          {/* @ts-ignore */}
          <sw-auth partner-key="52eef26ebc47d7fa56b1bfd123c1a58376437d3c" />
        </div>
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <Switch>
            <Route exact component={GetStarted} path="/" {...props} />
            <Route path="/integrate" component={PartnerIntegration} {...props} />
            <Route path="/redirect" component={Redirect} {...props} />
            {isAutheticated && <Route path="/partner" component={Partners} {...props} />}
            {isAutheticated ? <Route component={NotFound} /> : <RedirectRoute to={{ pathname: '/', state: { from: location.pathname } }} />}
          </Switch>
        )}
      </div>
    </>
  );
}

export default withRouter(App);
