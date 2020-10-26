import React from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import CurrentDate from "./components/CurrentDate";

const App = () => {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/details/:kod">
          <CardDetails />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <CurrentDate />
      <Footer />
    </Router>
  );
};

export default App;
