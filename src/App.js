import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";

import HomePage from "./pages/HomePage/HomePage";
import HistoricalRatePage from "./pages/HistoricalRatePage/HistoricalRatePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/historical-rate" component={HistoricalRatePage} />
      </Switch>
    </div>
  );
}

export default App;
