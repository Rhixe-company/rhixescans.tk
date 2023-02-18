import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Provider } from "react-redux";

import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./pages/HomeView";
import ComicView from "./pages/ComicView";
import ChapterView from "./pages/ChapterView";
//import LoginView from "./pages/LoginView";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ComicsScreen from "./screens/ComicsScreen";
import ComicsListScreen from "./screens/ComicsListScreen";
import ComicsEditScreen from "./screens/ComicsEditScreen";
import ChaptersListScreen from "./screens/ChaptersListScreen";
import ChaptersEditScreen from "./screens/ChaptersEditScreen";
//import BookmarksScreen from "./screens/BookmarksScreen";
import BookmarksView from "./pages/BookmarksView";
import CategoryScreens from "./screens/CategoryScreens";
import GenreScreens from "./screens/GenreScreens";
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <Container fluid>
              <Switch>
                <Route exact path="/" component={HomeView} />
                <Route path="/comic/:id/" component={ComicView} />
                <Route path="/chapter/:id/" component={ChapterView} />
                <Route path="/category/:id/" component={CategoryScreens} />
                <Route path="/genre/:id/" component={GenreScreens} />
                <Route path="/comics" component={ComicsScreen} />
                <Route path="/bookmarks" component={BookmarksView} />

                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/admin/users" component={UserListScreen} />
                <Route path="/admin/user/:id/edit" component={UserEditScreen} />
                <Route path="/admin/comics" component={ComicsListScreen} />
                <Route
                  path="/admin/comic/:id/edit"
                  component={ComicsEditScreen}
                />
                <Route path="/admin/chapters" component={ChaptersListScreen} />
                <Route
                  path="/admin/chapter/:id/edit"
                  component={ChaptersEditScreen}
                />
              </Switch>
            </Container>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
