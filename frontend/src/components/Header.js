import * as React from "react";

import { useState, useEffect } from "react";

import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import FormContainer from "./FormContainer";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import logo from "../svgs/logo.svg";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
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
import { listCategorys } from "../actions/categoryActions";
import Loader from "./Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

function Header({ title }) {
  let history = useHistory();
  const [data, setData] = useState({ search: "" });

  const dispatch = useDispatch();
  const categorysList = useSelector((state) => state.categorysList);
  const { error: errorCat, loading: loadingCat, categorys } = categorysList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(listCategorys());
  }, [dispatch]);
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
      {loadingCat && <Loader />}
      {errorCat && <Message variant="danger">{errorCat}</Message>}
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
            alt={title}
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
          <LinkContainer to="/blog">
            <Nav.Link>Comics</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Category" id="genres">
            {categorys?.map((cat) => (
              <LinkContainer key={cat.id} to={`/cat/${cat.id}`}>
                <NavDropdown.Item>{cat.name}</NavDropdown.Item>
              </LinkContainer>
            ))}
          </NavDropdown>

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
