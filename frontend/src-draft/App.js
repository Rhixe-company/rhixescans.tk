import "./style.css";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Comicpage from "./pages/Comicpage";
import Chapterpage from "./pages/Chapterpage";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />

        <Route path="/comic/:slug" component={Comicpage} />
        <Route path="/chapter/:name" component={Chapterpage} />
      </Switch>
    </Router>
  );
};

export default App;
