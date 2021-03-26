import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectRoundedResult } from "../../store/currency/selectors";

export default function AmountInput(props) {
  const [inputAmountChild, setInputAmountChild] = useState(0);
  const result = useSelector(selectRoundedResult);

  useEffect(() => {
    props.sendAmountData(inputAmountChild);
  }, [inputAmountChild]);

  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              value={inputAmountChild}
              onChange={(e) => {
                setInputAmountChild(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col md="auto">
          <img
            style={{
              width: 75,
              marginTop: 10,
            }}
          />
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
