import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrencies } from "../../store/currency/actions";
import { selectAllCurrecies } from "../../store/currency/selectors";

export default function CurrencyInput(props) {
  const dispatch = useDispatch();
  const [currencyFromChild, setCurrencyFromChild] = useState("EUR");
  const [currencyToChild, setCurrencyToChild] = useState("USD");
  const allCurrencies = useSelector(selectAllCurrecies);

  useEffect(() => {
    dispatch(fetchAllCurrencies());
  }, [dispatch]);

  useEffect(() => {
    props.sendCurrenciesData(currencyFromChild, currencyToChild);
  }, [currencyFromChild, currencyToChild, props]);

  const switchCurrencies = (e) => {
    e.preventDefault();
    const tempFrom = currencyFromChild;
    const tempTo = currencyToChild;
    setCurrencyToChild(tempFrom);
    setCurrencyFromChild(tempTo);
  };

  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Currency:</Form.Label>
            <Form.Control
              as="select"
              value={currencyFromChild}
              onChange={(e) => {
                setCurrencyFromChild(e.target.value);
              }}
              //   onSelect={currencySubmit()}
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
              value={currencyToChild}
              onChange={(e) => {
                setCurrencyToChild(e.target.value);
              }}
              //   onSelect={currencySubmit()}
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
      </Row>
    </div>
  );
}
