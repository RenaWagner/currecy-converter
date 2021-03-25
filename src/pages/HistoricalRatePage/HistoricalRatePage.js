import React from "react";
import { Jumbotron } from "react-bootstrap";
import HistoricalRate from "../../components/HistoricalRate/HistoricalRate";

export default function HomePage() {
  return (
    <div>
      <Jumbotron>
        <h2>Historical Exchange Rate Tracker</h2>
      </Jumbotron>
      <HistoricalRate />
    </div>
  );
}
