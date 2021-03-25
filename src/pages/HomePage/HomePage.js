import React from "react";
import { Jumbotron } from "react-bootstrap";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import HistoricarRate from "../../components/HistoricalRate/HistoricarRate";

export default function HomePage() {
  return (
    <div>
      <Jumbotron>
        <h2>Converter</h2>
      </Jumbotron>
      <CurrencyConverter />
      <HistoricarRate />
    </div>
  );
}
