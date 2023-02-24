import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Home from "./pages/Free/Home";
import Comic from "./pages/Free/Comic";
import Chapter from "./pages/Free/Chapter";
import Genre from "./pages/Free/Genre";
import Cat from "./pages/Free/Cat";
import Login from "./pages/Free/Login";
import Register from "./pages/Free/Register";
import Users from "./pages/Protected/Users";
import Profile from "./pages/Protected/Profile";
import Comics from "./pages/Protected/Comics";
import Chapters from "./pages/Protected/Chapters";
import "@fontsource/roboto";
import Container from "@material-ui/core/Container";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
const theme = createTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginBottom: 15,
    },
  },
  palette: {
    primary: {
      main: deepPurple[400],
    },
    // secondary: {
    //   main: deepPurple[400],
    // },
  },
});

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Router>
            <React.Fragment>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/comic/:slug">
                  <Comic />
                </Route>
                <Route path="/chapter/:name">
                  <Chapter />
                </Route>
                <Route path="/genre/:id">
                  <Genre />
                </Route>
                <Route path="/cat/:id">
                  <Cat />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/admin/users">
                  <Users />
                </Route>
                <Route path="/admin/chapters">
                  <Chapters />
                </Route>
                <Route path="/admin/comics">
                  <Comics />
                </Route>
              </Switch>
              <Footer
                title="rhixescans"
                description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis repudiandae placeat sit rerum delectus soluta dignissimos temporibus, magni tempora sequi et tempore non voluptatum! Maxime quae assumenda reprehenderit officiis itaque!"
              />
            </React.Fragment>
          </Router>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
