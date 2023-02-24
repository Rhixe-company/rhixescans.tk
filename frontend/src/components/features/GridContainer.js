import React from "react";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const GridContainer = () => {
  return (
    <React.Fragment>
      <Typography variant="h2" component="div">
        Top Comics
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid xs item>
          <Paper
            style={{
              height: 75,
              width: "100%",
            }}
          />
        </Grid>
        <Grid xs item>
          <Paper
            style={{
              height: 75,
              width: "100%",
            }}
          />
        </Grid>
        <Grid xs item>
          <Paper
            style={{
              height: 75,
              width: "100%",
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h2" component="div">
        Recent Updates
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid lg item>
          <Paper
            style={{
              height: 200,
              width: 500,
            }}
          />
        </Grid>
        <Grid lg item>
          <Paper
            style={{
              height: 200,
              width: 500,
            }}
          />
        </Grid>
        <Grid lg item>
          <Paper
            style={{
              height: 200,
              width: 500,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default GridContainer;
