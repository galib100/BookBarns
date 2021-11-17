import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const ProtecteComponent = ({ auth, children }) => {
  const history = useHistory();
  useEffect(() => {
    if (auth !== true) {
      history.push("/admin/login");
    }
  }, [auth]);
  return <>{children}</>;
};
const mapStateToProps = (state) => ({
  auth: state.auth_admin.isAuthenticated,
});
export default connect(mapStateToProps, null)(ProtecteComponent);
