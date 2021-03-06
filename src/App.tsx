import { useEffect, useState } from 'react';
import { withRouter, Switch, Route, Redirect as RedirectRoute, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CssBaseline } from '@mui/material';
import { ReactComponent as SwLogo } from '@assets/sw-logo-icon.svg';
import { setPartnersAgreementCommunity } from '@store/Partner/partner.reducer';
import Redirect from '@components/Redirect';
import { resetAuthState, setAuthenticated } from '@auth/auth.reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import NotFound from '@components/NotFound';
import { environment } from '@api/environment';
import { InitSwAuth } from '@skill-wallet/auth';
import detectEthereumProvider from '@metamask/detect-provider';
import { openSnackbar } from '@store/ui-reducer';
import Partners from './pages/Partners';
import SWSnackbar from './components/snackbar';
import GetStarted from './pages/GetStarted/GetStarted';
import PartnerIntegration from './pages/integrate/PartnerIntegration';
import './App.scss';

const LoadingMessage = () => (
  <div className="app-loading">
    <SwLogo width="80" height="80" />
  </div>
);

function App(props) {
  const dispatch = useAppDispatch();
  const location = useLocation<any>();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkForEthereumProvider = async () => {
      let ethereum: typeof window.ethereum;
      try {
        ethereum = await detectEthereumProvider();
      } catch (e) {
        console.log(e);
      }
      if (!ethereum) {
        dispatch(
          openSnackbar({
            message: 'Please install MetaMask and refresh the page to use the full array of Partner features.',
            severity: 'error',
            duration: 30000,
          })
        );
      }
    };
    checkForEthereumProvider();
  }, []);

  useEffect(() => {
    const onSWLogin = async ({ detail }: any) => {
      const isLoggedIn = !!detail;
      const sw = JSON.parse(sessionStorage.getItem('skillWallet') || '{}');
      if (isLoggedIn && sw?.isCoreTeamMember) {
        dispatch(setPartnersAgreementCommunity(sw.partnersAgreementKey));
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

    InitSwAuth({ container: document.querySelector('#connect-wallet-container') });

    return () => {
      window.removeEventListener('initSkillwalletAuth', onSWInit);
      window.removeEventListener('onSkillwalletLogin', onSWLogin);
    };
  }, [dispatch, history, location.pathname, location.state?.from]);

  const isIntegrateFlow = location?.pathname?.includes('integrate');
  const isRedirect = location?.pathname?.includes('redirect');
  const hideDashboard = !environment.hideDashboard || environment.hideDashboard === 'true';

  return (
    <>
      <div id="connect-wallet-container" />
      <CssBaseline />
      <SWSnackbar />
      <Box
        sx={{
          height: '100%',
        }}
        className={isLoading ? 'sw-loading' : ''}
      >
        <div className="connect-wallet-container">
          <sw-auth
            partner-key={environment.partnersKey}
            hide-button={isLoading || isIntegrateFlow || isRedirect}
            disable-create-new-user={!isIntegrateFlow}
            use-dev="true"
          />
        </div>
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <Switch>
            <Route exact component={GetStarted} path="/" {...props} />
            {!isAutheticated && <Route path="/integrate" component={PartnerIntegration} {...props} />}
            <Route path="/redirect" component={Redirect} {...props} />
            {isAutheticated && !hideDashboard && <Route path="/partner" component={Partners} {...props} />}
            {isAutheticated ? <Route component={NotFound} /> : <RedirectRoute to={{ pathname: '/', state: { from: location.pathname } }} />}
          </Switch>
        )}
      </Box>
    </>
  );
}

export default withRouter(App);
