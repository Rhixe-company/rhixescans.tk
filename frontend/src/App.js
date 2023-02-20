import "./scss/main.scss";
import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Search from "./views/search";
import Admin from "./views/Admin";
import Create from "./components/comics/create";
import Edit from "./components/comics/edit";
import Delete from "./components/comics/delete";
import UserList from "./views/UserList";
import UserEdit from "./views/UserEdit";
import Profile from "./views/Profile";
import Page from "./views/Page";
import Blog from "./views/Blog/Blog";
import Dashboard from "./views/Dashboard/Dashboard";
import ComicView from "./views/ComicView";
import Header from "./components/Header";
import CategoryScreens from "./views/CategoryScreens";
import GenreScreens from "./views/GenreScreens";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export class App extends Component {
  render() {
    const theme = createTheme();
    return (
      <Fragment>
        <Router>
          <ThemeProvider theme={theme}>
            <main>
              <Header title="Blog" />
              <Switch>
                <Route exact path="/" component={Blog} />
                <Route exact path="/blog" component={Home} />
                <Route exact path="/admin/comics/" component={Admin} />
                <Route exact path="/admin/chapters/" component={Dashboard} />
                <Route exact path="/admin/comics/create" component={Create} />
                <Route exact path="/admin/comic/edit/:id" component={Edit} />
                <Route
                  exact
                  path="/admin/comics/delete/:id"
                  component={Delete}
                />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/comic/:slug" component={ComicView} />
                <Route path="/chapter/:name" component={Page} />
                <Route path="/search" component={Search} />
                <Route path="/admin/users" component={UserList} />
                <Route path="/admin/user/:id/edit" component={UserEdit} />
                <Route path="/profile" component={Profile} />
                <Route path="/category/:id/" component={CategoryScreens} />
                <Route path="/genres/:id/" component={GenreScreens} />
              </Switch>
            </main>
          </ThemeProvider>
        </Router>
      </Fragment>
    );
  }
}

export default App;
