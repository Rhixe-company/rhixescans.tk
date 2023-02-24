import React from "react";

import logo from "../../logo.svg";
import AppBar from "@material-ui/core/AppBar";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
const Header = () => {
  return (
    <header className="App-header">
      <AppBar color="primary">
        <Navbar expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src={logo}
                  className="App-logo"
                  alt="Rhixescans"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/comics">
                  <Nav.Link>Comics</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Genres" id="genres">
                  <LinkContainer to={`/genre/`}>
                    <NavDropdown.Item>genre.name</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </AppBar>
    </header>
  );
};

export default Header;
