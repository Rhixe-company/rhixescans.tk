import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import TextField from "@material-ui/core/TextField";

const Login = () => {
  return (
    <div div className="App">
      <TextField
        variant="filled"
        color="secondary"
        label="Username"
        placeholder="robot"
      />

      <TextField
        variant="filled"
        color="secondary"
        type="email"
        label="Email"
        placeholder="robot@admin.com"
      />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<SaveIcon />}
        size="large"
        href="/#/Chapter"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
