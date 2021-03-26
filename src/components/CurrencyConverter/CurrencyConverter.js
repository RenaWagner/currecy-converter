import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCurrencies,
  fetchCurrencyRate,
} from "../../store/currency/actions";
import { selectRoundedResult } from "../../store/currency/selectors";
import "./CurrencyConverter.css";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import AmountInput from "../AmountInput/AmountInput";

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

  useEffect(() => {
    dispatch(fetchAllCurrencies());
  }, [dispatch]);

  const currencyAmountInput = (e) => {
    e.preventDefault();
    dispatch(fetchCurrencyRate(date, currencyFrom, currencyTo, inputAmount));
  };

  const sendCurrenciesData = (currencyFrom, currencyTo) => {
    setCurrencyFrom(currencyFrom);
    setCurrencyTo(currencyTo);
  };

  const sendAmountData = (amountInput) => {
    setInputAmount(amountInput);
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
        <CurrencyInput sendCurrenciesData={sendCurrenciesData} />
        <AmountInput sendAmountData={sendAmountData} />
        <Button variant="success" onClick={currencyAmountInput} block>
          Convert!
        </Button>
      </Form>
    </Container>
  );
}
