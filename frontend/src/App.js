import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Dashboard from "./pages/Free/Dashboard";
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
import Bookmarks from "./pages/Protected/Bookmarks";
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
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/comic/:slug" component={Comic} />
          <Route path="/chapter/:name" component={Chapter} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/blog" component={Home} />
          <Route path="/genres/:id" component={Genre} />
          <Route path="/cat/:id" component={Cat} />
          <Route path="/profile" component={Profile} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/chapters" component={Chapters} />
          <Route path="/admin/comics" component={Comics} exact />
          <Route path="/admin/comics/:pageNumber" component={Comics} exact />
          <Route path="/page/:pageNumber" component={Dashboard} exact />
          <Route path="/" component={Dashboard} exact />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
