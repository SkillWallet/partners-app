import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from '@store/store';
import { swEnvVariables, environment } from '@api/environment';
import { ensureVariablesExist } from 'sw-web-shared';
import { SwTheme } from './theme';
import '@skill-wallet/auth';
import reportWebVitals from './reportWebVitals';
import App from './App';

const persistor = persistStore(store);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={SwTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

ensureVariablesExist(environment, swEnvVariables);
reportWebVitals(null);
