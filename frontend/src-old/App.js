import React, { Fragment } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import Header from "./components/header";
import Footer from "./components/footer";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
// import Single from "./views/single";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ComicView from "./views/ComicView";

const App = () => {
  const theme = createTheme();
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="Blog" />
            <Route exact path="/" component={Blog} />
            <Route exact path="/blog" component={Home} />
            <Route exact path="/admin/comics/" component={Admin} />
            <Route exact path="/admin/chapters/" component={Dashboard} />
            <Route exact path="/admin/comics/create" component={Create} />
            <Route exact path="/admin/comic/edit/:id" component={Edit} />
            <Route exact path="/admin/comics/delete/:id" component={Delete} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/comic/:slug" component={ComicView} />
            <Route path="/chapter/:name" component={Page} />
            <Route path="/search" component={Search} />
            <Route path="/admin/users" component={UserList} />
            <Route path="/admin/user/:id/edit" component={UserEdit} />
            <Route path="/profile" component={Profile} />
            <Footer title="Read Free" description="Manhwa And Manhua Comics!" />
          </ThemeProvider>
        </Router>
      </Container>
    </Fragment>
  );
};

export default App;
