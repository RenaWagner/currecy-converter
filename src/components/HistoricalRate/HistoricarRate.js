import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../../store/historicalRate/actions";
import { selectHistoricalData } from "../../store/historicalRate/selectors";

export default function HistoricarRate() {
  const dispatch = useDispatch();
  const today =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const yearAgo =
    new Date().getFullYear() -
    1 +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [startDate, setStartDate] = useState(yearAgo);
  const [endDate, setEndDate] = useState(today);
  const historicalResults = useSelector(selectHistoricalData);
  const currencyFrom = "JPY";
  const currencyTo = "USD";

  console.log(historicalResults);

  const historicalDataClicked = () => {
    dispatch(fetchHistoricalData(startDate, endDate, currencyFrom, currencyTo));
  };

  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <Container>
      <h4>Historical Exchange Rate of "CurrencyFrom(USD)"</h4>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>From:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={historicalDataClicked}>
          Check!
        </Button>
      </Form>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </Container>
  );
}
