import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
const Navbar = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <a href="/#/">Rhixescans</a>
        </div>
        <Nav>
          <LinkContainer to="/blog">
            <Nav.Link>Comics</Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.user_name} id="username">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/Bookmarks">
                <NavDropdown.Item>Bookmarks</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : (
            <NavDropdown title={<>Users</>} id="adminmenu">
              <LinkContainer to="/login">
                <NavDropdown.Item>Sign In</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavDropdown.Item>Register</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminmenu">
              <LinkContainer to="/admin/users">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/comics">
                <NavDropdown.Item>Comics</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/chapters">
                <NavDropdown.Item>Chapters</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </div>
    </nav>
  );
};

export default Navbar;
