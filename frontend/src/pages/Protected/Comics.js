import React from "react";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const Comics = () => {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Button
            startIcon={<SaveIcon />}
            size="large"
            variant="contained"
            color="secondary"
            href="/#/Comics/"
          >
            Comics
          </Button>
        </header>
      </div>
    </React.Fragment>
  );
};

export default Comics;
