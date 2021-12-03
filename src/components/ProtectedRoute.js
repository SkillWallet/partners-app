import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';

const ProtectedRoute = ({component: Component, ...props}) => {
    const isAuthenticated = props.state.members.auth;

    return (
        <Route
        render={() =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
          }>
        </Route>
    );
};


const mapStateToProps = state => {
    return {
      state: {
          members: state.members
      }
    }
  }

  export default connect(mapStateToProps)(ProtectedRoute);