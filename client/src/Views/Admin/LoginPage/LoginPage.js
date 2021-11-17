import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { LoginForm } from "../../../Components/Admin/LoginForm/";
import { loginToken } from "../../../Actions/Admin/AuthActions";
import { useHistory } from "react-router-dom";

const LoginPage = ({ loginToken, auth, loading }) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginToken(localStorage.getItem("token"));
    }
    if (auth && !loading) {
      history.push("/admin/dashboard");
    }
  }, [auth]);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth_admin.isAuthenticated,
  loading: state.auth_admin.loading,
});

export default connect(mapStateToProps, { loginToken })(LoginPage);
