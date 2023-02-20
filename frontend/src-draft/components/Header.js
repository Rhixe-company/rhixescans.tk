import * as React from "react";

import { useState} from "react";

import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import FormContainer from "./FormContainer";
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
// import { listGenres } from "../actions/genresActions";
function Header() {
  let history = useHistory();
  const [data, setData] = useState({ search: "" });
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  // const { genres } = useSelector((state) => state.genres);

  // useEffect(() => {
  //   dispatch(listGenres());
  // }, [dispatch]);
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
          <FormContainer>
            <SearchBar
              value={data.search}
              onChange={(newValue) => setData({ search: newValue })}
              onRequestSearch={() => goSearch(data.search)}
            />
          </FormContainer>
        </Typography>

        <Nav>
          <LinkContainer to="/blog">
            <Nav.Link>Comics</Nav.Link>
          </LinkContainer>

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
      {/* <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {genres?.map((section) => (
          <Link
            color="inherit"
            noWrap
            className="App-link"
            key={section.id}
            variant="body2"
            href="#"
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.name}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}

export default Header;
