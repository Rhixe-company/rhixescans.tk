import React from "react";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";
const Chapters = () => {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Button
            startIcon={<SaveIcon />}
            size="large"
            variant="contained"
            color="secondary"
            href="/#/Chapters/"
          >
            Chapters
          </Button>
        </header>
      </div>
    </React.Fragment>
  );
};

export default Chapters;
