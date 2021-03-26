import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function DateInput(props) {
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
  const [date, setDate] = useState(props.day === "today" ? today : yearAgo);

  useEffect(() => {
    props.sendDateInput(date);
  }, [date, props]);

  return (
    <div>
      <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Form.Text className={props.textClassName}>{props.text}</Form.Text>
      </Form.Group>
    </div>
  );
}
