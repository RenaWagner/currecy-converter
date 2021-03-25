import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCurrencies,
  fetchCurrencyRate,
} from "../../store/currency/actions";
import {
  selectAllCurrecies,
  selectRoundedResult,
} from "../../store/currency/selectors";
import "./CurrencyConverter.css";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

export default function CurrencyConverter() {
  const dispatch = useDispatch();
  const today =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [date, setDate] = useState(today);
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [inputAmount, setInputAmount] = useState(0);
  const result = useSelector(selectRoundedResult);
  const allCurrencies = useSelector(selectAllCurrecies);

  useEffect(() => {
    dispatch(fetchAllCurrencies());
  }, [dispatch]);

  const currencyAmountInput = (e) => {
    e.preventDefault();
    dispatch(fetchCurrencyRate(date, currencyFrom, currencyTo, inputAmount));
  };

  const switchCurrencies = (e) => {
    e.preventDefault();
    const tempFrom = currencyFrom;
    const tempTo = currencyTo;
    setCurrencyTo(tempFrom);
    setCurrencyFrom(tempTo);
    console.log(tempTo);
  };

  return (
    <Container>
      <h4>Currency Converter</h4>
      <Form>
        <Form.Group>
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Form.Text className="text-muted">
            Choose the date that you want to use for conversion.
          </Form.Text>
        </Form.Group>
      </Form>

      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Currency:</Form.Label>
              <Form.Control
                as="select"
                value={currencyFrom}
                onChange={(e) => {
                  setCurrencyFrom(e.target.value);
                }}
              >
                <option value="EUR">EUR</option>
                {allCurrencies.map((currency, index) => {
                  return (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                value={inputAmount}
                onChange={(e) => {
                  setInputAmount(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md="auto">
            <button className="img-btn" onClick={switchCurrencies}>
              <img
                src="https://iconbox.fun/wp/wp-content/uploads/139_arr_24.svg"
                alt="Arrow icon"
                style={{
                  width: 75,
                  marginTop: 10,
                }}
              />
            </button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Currency:</Form.Label>
              <Form.Control
                as="select"
                value={currencyTo}
                onChange={(e) => {
                  setCurrencyTo(e.target.value);
                }}
              >
                <option value="EUR">EUR</option>
                {allCurrencies.map((currency, index) => {
                  return (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                disabled
                value={result.resultAmount ? result.resultAmount : "0"}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={currencyAmountInput} block>
          Convert!
        </Button>
      </Form>
    </Container>
  );
}
