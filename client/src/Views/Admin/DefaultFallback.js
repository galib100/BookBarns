import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const DefaultFallback = ({ auth }) => {
  return auth ? (
    <Redirect to="/admin/dashboard" />
  ) : (
    <Redirect to="/admin/login" />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth_admin.isAuthenticated,
});

export default connect(mapStateToProps, null)(DefaultFallback);
