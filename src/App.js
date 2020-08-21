import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme.js";
import jwtDecode from "jwt-decode";
import axios from "axios";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SET_AUTHENTICATED } from "./redux/types.js";
import { logoutUser, getUserData } from "./redux/actions/userActions.js";

// Components
import Navbar from "./components/layout/Navbar.js";
import AuthRoute from "./util/AuthRoute.js";

// Pages
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import user from "./pages/user.js";

const theme = createMuiTheme(themeFile);

// axios.defaults.baseURL =
//   "https://us-central1-socialape-59628.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={Signup} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route
                    exact
                    path="/users/:handle/scream/:screamId"
                    component={user}
                  />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
