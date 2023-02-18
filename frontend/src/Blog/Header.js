import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import logo from "../svgs/logo.svg";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavDropdown } from "react-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaTools,
  FaBook,
  FaBookOpen,
  FaBookmark,
} from "react-icons/fa";
function Header(props) {
  let history = useHistory();
  const [data, setData] = useState({ search: "" });
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const { sections } = props;
  const goSearch = (e) => {
    history.push({
      pathname: "/#/search/",
      search: "?search=" + data.search,
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <React.Fragment>
      {/* <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Link to="/">
          <img
            src={logo}
            alt={logo}
            width="10%"
            height="10%"
            className="d-inline-block align-middle"
          />
        </Link>

        <SearchBar
          value={data.search}
          onChange={(newValue) => setData({ search: newValue })}
          onRequestSearch={() => goSearch(data.search)}
        />

        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar> */}
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Link
          color="inherit"
          noWrap
          variant="body2"
          sx={{ p: 1, flexShrink: 0 }}
          href="/"
        >
          <img
            src={logo}
            alt={logo}
            width="10%"
            height="10%"
            className="d-inline-block align-middle"
          />
        </Link>
        <Typography
          component="div"
          variant="div"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <SearchBar
            value={data.search}
            onChange={(newValue) => setData({ search: newValue })}
            onRequestSearch={() => goSearch(data.search)}
          />
        </Typography>
        <Nav>
          {userInfo ? (
            <NavDropdown title={userInfo.user_name} id="username">
              <LinkContainer to="/profile">
                <NavDropdown.Item>
                  {" "}
                  <FaTools />
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/Bookmarks">
                <NavDropdown.Item>
                  <FaBookmark />
                  Bookmarks
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <NavDropdown
                title={
                  <>
                    <FaUser />
                  </>
                }
                id="adminmenu"
              >
                <LinkContainer to="/login">
                  <NavDropdown.Item>
                    <FaSignInAlt />
                    <Button> Sign In</Button>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/register">
                  <NavDropdown.Item>
                    <FaSignOutAlt />
                    <Button> Register</Button>
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminmenu">
              <LinkContainer to="/admin/users">
                <NavDropdown.Item>
                  {" "}
                  <FaUser />
                  Users
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/comics">
                <NavDropdown.Item>
                  <FaBook />
                  Comics
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/chapters">
                <NavDropdown.Item>
                  <FaBookOpen />
                  Chapters
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            className="App-link"
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
