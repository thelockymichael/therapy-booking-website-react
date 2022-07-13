/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import {
  FieldProps,
} from 'formik'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({
  field,
  label,
  placeholder,
}: TextProps) => (
  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm={2}>{label}</Form.Label>
    <Col sm={10}>
      <Form.Control
        type="text"
        placeholder={placeholder}
        {...field}
      />
    </Col>
  </Form.Group>
)
