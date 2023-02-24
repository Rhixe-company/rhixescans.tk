import React from "react";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const Comic = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          startIcon={<SaveIcon />}
          size="large"
          variant="contained"
          color="secondary"
          href="/#/Comic/"
        >
          Comic
        </Button>
      </header>
    </div>
  );
};

export default Comic;
