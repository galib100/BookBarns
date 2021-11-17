import { useEffect } from "react";
import { RouteWithSubRoutes } from "./Routes/RouteWithSubRoutes";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./Routes/routes";
import protectedRoutes from "./Routes/protectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser, clearUser } from "./Actions/Viewer/userAction";
import { BASE_URL } from "./Constants/URL";
import { ErrorPage } from "./Views/Viewer/ErrorPage";
import { loginToken } from "./Actions/Admin/AuthActions";
import {
  saveBooksToStore,
  saveFilteredBooksToStore,
} from "./Actions/Viewer/BookRelated";

const App = ({
  setUser,
  clearUser,
  loginToken,
  authAdmin,
  saveBooksToStore,

  saveFilteredBooksToStore,
  savedBooks,
}) => {
  // /////////////////////////////////////////////////////////
  // for client handling authentication issues - added by @mizan
  useEffect(() => {
    if (localStorage.getItem("viewer_token")) {
      const viewer_saved_token = {
        token: localStorage.getItem("viewer_token"),
      };

      axios
        .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
        .then((res) => {
          const currentUser = JSON.parse(localStorage.getItem("viewer"));
          const token = localStorage.getItem("viewer_token");
          const userData = { token, currentUser };
          setUser(userData);
        })
        .catch((err) => {
          localStorage.removeItem("viewer");
          localStorage.removeItem("viewer_token");
          clearUser();
        });
    }
    const loginAdmin = () => {
      //console.log("USE EFFECT");
      if (localStorage.getItem("token") && !authAdmin) {
        //console.log("TIKEN IN");
        loginToken(localStorage.getItem("token"));
      }
    };
    if (savedBooks.length === 0) {
      fetchBooks();
    } else {
      saveFilteredBooksToStore(savedBooks);
    }
    loginAdmin();
  }, [authAdmin]);

  const fetchBooks = () => {
    axios
      .get(`${BASE_URL}/api/admin/allBooks`)
      .then((res) => {
        const actualData = res.data.books.filter(
          (item) => item.deleted !== true
        );
        saveBooksToStore(actualData); // <-- save books to redux store
        saveFilteredBooksToStore(actualData); // <-- filter books
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        {protectedRoutes.map((route, i) => (
          <ProtectedRoute
            key={i}
            {...route}
            editor={route.editor && route.editor}
          />
        ))}
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => dispatch(setUser(data)),
    clearUser: (data) => dispatch(clearUser(data)),
    loginToken: (data) => dispatch(loginToken(data)),
    saveBooksToStore: (books) => dispatch(saveBooksToStore(books)),
    saveFilteredBooksToStore: (books) =>
      dispatch(saveFilteredBooksToStore(books)),
  };
};

const mapStateToProps = (state) => ({
  authAdmin: state.auth_admin.isAuthenticated,
  savedBooks: state.bookController.books,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
