import "./App.css";
import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import HomeScreen from "./screens/HomeScreen";
import SeriesScreen from "./screens/SeriesScreen";
import ComicScreen from "./screens/ComicScreen";
import ChapterScreen from "./screens/ChapterScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ComicsListScreen from "./screens/ComicsListScreen";
import ComicsEditScreen from "./screens/ComicsEditScreen";
import ChaptersListScreen from "./screens/ChaptersListScreen";
import ChaptersEditScreen from "./screens/ChaptersEditScreen";
import BookmarksScreen from "./screens/BookmarksScreen";
import CategoryScreens from "./screens/CategoryScreens";
import GenreScreens from "./screens/GenreScreens";

export class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <main className="py-3">
            <Container className="App" fluid>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/series" component={SeriesScreen} />
              <Route path="/chapter/:id" component={ChapterScreen} />
              <Route path="/comic/:id" component={ComicScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/category/:id/" component={CategoryScreens} />
              <Route path="/genre/:id/" component={GenreScreens} />
              <Route path="/bookmarks" component={BookmarksScreen} />
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
            </Container>
          </main>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
