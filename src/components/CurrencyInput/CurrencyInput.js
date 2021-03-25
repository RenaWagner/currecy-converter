import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrencies } from "../../store/currency/actions";
import {
  selectAllCurrecies,
  selectRoundedResult,
} from "../../store/currency/selectors";

export default function CurrencyInput() {
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

  return (
    <div>
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
          </Form.Group>
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
              <option value="USD">USD</option>
              {allCurrencies.map((currency, index) => {
                return (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
