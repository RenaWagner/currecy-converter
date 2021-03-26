import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectRoundedResult } from "../../store/currency/selectors";

export default function AmountInput(props) {
  const [inputAmountChild, setInputAmountChild] = useState(0);
  const result = useSelector(selectRoundedResult);

  useEffect(() => {
    props.sendAmountData(inputAmountChild);
  }, [inputAmountChild, props]);

  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              value={inputAmountChild}
              min="0.01"
              step="0.01"
              onChange={(e) => {
                setInputAmountChild(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col md="auto">
          <p
            style={{
              width: 75,
            }}
          ></p>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={result.resultAmount ? result.resultAmount : "0"}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
