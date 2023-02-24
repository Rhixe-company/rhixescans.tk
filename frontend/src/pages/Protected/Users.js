import React from "react";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const Users = () => {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Button
            startIcon={<SaveIcon />}
            size="large"
            variant="contained"
            color="secondary"
            href="/#/Users/"
          >
            Users
          </Button>
        </header>
      </div>
    </React.Fragment>
  );
};

export default Users;
