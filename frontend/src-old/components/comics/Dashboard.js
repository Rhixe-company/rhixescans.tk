import React, { Fragment } from "react";
import Comics from "./Comics";
import Comicsform from "./Comicsform";

const Dashboard = () => {
  return (
    <Fragment>
      <Comicsform />
      <Comics />
    </Fragment>
  );
};

export default Dashboard;
