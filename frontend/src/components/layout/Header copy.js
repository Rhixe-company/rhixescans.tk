import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import logo from "../../logo.svg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Typography from "@material-ui/core/Typography";
const Header = () => {
  return (
    <header className="App-header">
      <AppBar color="primary">
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Button href="/#/">
            <img className="App-logo" src={logo} alt={logo} />
          </Button>
          <div>
            <TextField
              variant="outlined"
              color="primary"
              type="search"
              label="Search"
              placeholder="Search for Comics......"
            />
          </div>

          <ButtonGroup variant="contained" color="default">
            <Button startIcon={<FaSignInAlt />} size="small" href="/#/Login">
              <Typography variant="h6" component="div">
                Login{" "}
              </Typography>
            </Button>
            <Button
              startIcon={<FaSignOutAlt />}
              size="small"
              href="/#/Register"
            >
              {" "}
              <Typography variant="h6" component="div">
                Register
              </Typography>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
