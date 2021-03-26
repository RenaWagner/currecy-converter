import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../../store/historicalRate/actions";
import { selectHistoricalData } from "../../store/historicalRate/selectors";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import DateInput from "../DateInput/DateInput";

export default function HistoricalRate() {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const historicalResults = useSelector(selectHistoricalData);
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  // console.log(roundedResults);

  const dates = historicalResults.map((result) => {
    return result.date;
  });
  const historicalData = historicalResults.map((result) => {
    return result.rate;
  });

  const historicalDataClicked = () => {
    dispatch(fetchHistoricalData(startDate, endDate, currencyFrom, currencyTo));
  };

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Exchange Rate",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: historicalData,
        radius: 0,
      },
    ],
  };

  const sendCurrenciesData = (currencyFrom, currencyTo) => {
    setCurrencyFrom(currencyFrom);
    setCurrencyTo(currencyTo);
  };

  const sendStartDateInput = (startDateInput) => {
    setStartDate(startDateInput);
  };

  const sendEndDateInput = (endDateInput) => {
    setEndDate(endDateInput);
  };

  return (
    <Container>
      <h4>Historical Exchange Rate Checker</h4>
      <Form>
        <CurrencyInput sendCurrenciesData={sendCurrenciesData} />
        <Row>
          <Col>
            <DateInput
              sendDateInput={sendStartDateInput}
              label={"From:"}
              textClassName={""}
              text={""}
              day={"yesterday"}
            />
          </Col>
          <Col>
            <DateInput
              sendDateInput={sendEndDateInput}
              label={"To:"}
              textClassName={""}
              text={""}
              day={"today"}
            />
          </Col>
        </Row>
        <Button variant="success" onClick={historicalDataClicked} block>
          Check!
        </Button>
      </Form>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: `Exchange rate: ${currencyFrom} in ${currencyTo}`,
            fontSize: 20,
          },
          legend: {
            display: false,
          },
        }}
      />
    </Container>
  );
}
