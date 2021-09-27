import React from "react";
import "./Input.scss";

import { Form } from "react-bulma-components";

const Input = ({ label = "", id = "", ...props }) => {
    return (
        <Form.Field className="mb-4">
            <label htmlFor={id}>{label}</label>
            <Form.Control>
                <Form.Input id={id} {...props} />
            </Form.Control>
        </Form.Field>
    );
};

export default Input;
