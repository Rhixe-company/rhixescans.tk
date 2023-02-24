import React from "react";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const Cat = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          startIcon={<SaveIcon />}
          size="large"
          variant="contained"
          color="secondary"
          href="/#/Cat/"
        >
          Cat
        </Button>
      </header>
    </div>
  );
};

export default Cat;
