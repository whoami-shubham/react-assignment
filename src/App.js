import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Likes from "./views/Likes/Likes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/likes" component={Likes} />
      </Switch>
    </Router>
  );
}

export default App;
