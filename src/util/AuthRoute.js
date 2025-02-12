import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//Redux stuff
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

AuthRoute.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps)(AuthRoute);
