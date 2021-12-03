import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { defineCustomElements } from '@skill-wallet/auth/loader';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { persistStore } from 'redux-persist';

import { CssBaseline } from '@mui/material';
import store from '@partners-store/store';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { SwTheme } from './theme';
import './styles/index.css';

const persistor = persistStore(store);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={SwTheme}>
      <HashRouter basename="/">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CssBaseline />
            <App />
          </PersistGate>
        </Provider>
      </HashRouter>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

reportWebVitals();
defineCustomElements(window);
