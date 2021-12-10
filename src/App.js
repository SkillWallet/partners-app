import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles/Integrate.css";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { isUserAuthenticated } from "@store/Members/members.actions";
import { ReactComponent as SwLogo } from "@assets/sw-logo-icon.svg";
import Partners from "./pages/Partners";
import GetStarted from "./pages/get-started/get-started";
import Integrate from "./Integrate";
import Redirect from "@components/Redirect";
import { Typography } from "@mui/material";
import { compose } from "redux";
import "./styles/App.css";

const LoadingMessage = () => (
  <div className="app-loading">
    <SwLogo width="80" height="80" />
  </div>
);

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
      Not found!
    </Typography>
  );
}

function App(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const onSWLogin = async ({ detail }) => {
      const isLoggedIn = !!detail;
      const sw = JSON.parse(sessionStorage.getItem("skillWallet") || "{}");
      if (isLoggedIn && sw?.isCoreTeamMember) {
        props.dispatchAuthenticateUser(true);
        props.history.push("/partner/dashboard");
      } else {
        props.history.push("/");
      }
    };
    const onSWInit = async () => setLoading(false);
    window.addEventListener("initSkillwalletAuth", onSWInit);
    window.addEventListener("onSkillwalletLogin", onSWLogin);

    return () => {
      window.removeEventListener("initSkillwalletAuth", onSWInit);
      window.removeEventListener("onSkillwalletLogin", onSWLogin);
    };
  }, []);

  const isIntegrateFlow = props?.location?.pathname?.endsWith("integrate");

  return (
    <div className={isLoading ? "sw-loading" : ""}>
      <div
        className="connect-wallet-container"
        style={{
          // visibility: isIntegrateFlow ? "hidden" : "visible",
          top: isIntegrateFlow ? "-2000px" : "45px"
        }}
      >
        <skillwallet-auth
          allow-create-new-user="true"
          partner-key="685a1fd74240ae4216c4bd384dba56e498be8bc4"
        ></skillwallet-auth>
      </div>
      {isLoading ? (
        <LoadingMessage />
      ) : (
        <Switch>
          <Route
            exact
            component={GetStarted}
            path="/"
            {...props}
          />
          <Route path="/integrate" component={Integrate} {...props} />
          <Route path="/redirect" component={Redirect} {...props} />
          {props.state.members.auth && (
            <Route path="/partner" component={Partners} {...props} />
          )}
          <Route path="*" component={NoMatch} />
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: {
      members: state.members,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAuthenticateUser: (auth) => dispatch(isUserAuthenticated(auth)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
