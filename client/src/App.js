import store from "./Store/Store";
import { Provider } from "react-redux";
import { RouteWithSubRoutes } from "./Routes/RouteWithSubRoutes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./Routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
