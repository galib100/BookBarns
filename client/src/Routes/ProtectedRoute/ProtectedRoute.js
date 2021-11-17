import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ProtecteComponent from "./ProtecteComponent";

const ProtectedRoute = (route) => {
  return (
    <>
      {(route.admin === "admin" || route.editor === true) && (
        <Route
          path={route.path}
          render={(props) => {
            return (
              <ProtecteComponent>
                <route.component {...props} routes={route.routes} />
              </ProtecteComponent>
            );
          }}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  admin: state.auth_admin.admin.role,
});
export default connect(mapStateToProps, null)(ProtectedRoute);
