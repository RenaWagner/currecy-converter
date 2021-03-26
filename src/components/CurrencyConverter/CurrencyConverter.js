import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  fetchAllCurrencies,
  fetchCurrencyRate,
} from "../../store/currency/actions";

import "./CurrencyConverter.css";

import { Button, Container, Form } from "react-bootstrap";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import AmountInput from "../AmountInput/AmountInput";
import DateInput from "../DateInput/DateInput";

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
  const sendDateInput = (dateInput) => {
    setDate(dateInput);
  };

  return (
    <Container>
      <h4>Currency Converter</h4>
      <Form>
        <DateInput
          sendDateInput={sendDateInput}
          label={"Date:"}
          textClassName={"text-muted"}
          text={"Choose the date that you want to use for conversion."}
          day={"today"}
        />
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
