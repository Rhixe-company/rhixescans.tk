import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaTools,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import logo from "../svgs/logo.png";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SearchBox from "./SearchBox";
import { listGenres } from "../actions/genresActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { genres } = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGenres());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="center">
      <Navbar variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="Rhixescans"
                className="d-inline-block align-middle"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/comics">
                <Nav.Link>Comics</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Genres" id="genres">
                {genres?.map((genre) => (
                  <LinkContainer key={genre.id} to={`/genre/${genre.id}`}>
                    <NavDropdown.Item>{genre.name}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
              {userInfo ? (
                <NavDropdown title={userInfo.user_name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile
                      <FaTools />
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Bookmarks">
                    <NavDropdown.Item>
                      <BookmarkIcon />
                      Bookmarks
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FaSignOutAlt /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <NavDropdown title={<>Auth</>} id="adminmenu">
                    <LinkContainer to="/login">
                      <NavDropdown.Item>
                        <FaSignInAlt />
                        Sign In
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <NavDropdown.Item>
                        <FaSignOutAlt />
                        Register
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
