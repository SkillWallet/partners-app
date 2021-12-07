import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { defineCustomElements } from "@skill-wallet/auth/loader";
import Integrate from "./Integrate";
import Redirect from "./components/Redirect";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/partnerDashboard/Dashboard";
import Members from "./components/partnerDashboard/Members";
import Roles from "./components/partnerDashboard/Roles";
import { SwTheme } from "./theme";
import Partners from "./pages/Partners";
import { Typography } from "@mui/material";

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
      No found!
    </Typography>
  );
}

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={SwTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={App}></Route>

              <Route path="/integrate" component={Integrate}></Route>

              <Route path="/redirect" component={Redirect}></Route>

              <ProtectedRoute
                exact
                path="/analytics/members"
                component={Members}
              ></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/analytics/roles"
                component={Roles}
              ></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/analytics"
                component={Dashboard}
              ></ProtectedRoute>

              <ProtectedRoute
                path="/partner"
                component={Partners}
              ></ProtectedRoute>
              <Route path="*" component={NoMatch}></Route>
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
defineCustomElements(window);
