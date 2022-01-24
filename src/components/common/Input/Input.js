import React from "react";
import "./Input.scss";
import { useField } from "formik";

import { Form } from "react-bulma-components";

const Input = ({ label = "", id = "", type = "field", ...props }) => {
    const [field, meta] = useField(props);
    const hasError = meta.error && meta.touched;
    const renderInput = (type) => {
        switch (type) {
            case "select": {
                const { children } = props;
                return (
                    <Form.Select id={id} {...props} {...field}>
                        {children}
                    </Form.Select>
                );
            }
            case "textarea":
                return <Form.Textarea id={id} {...props} {...field} />;
            case "field":
            default:
                return (
                    <Form.Input
                        id={id}
                        {...props}
                        {...field}
                        color={hasError ? "danger" : ""}
                    />
                );
        }
    };
    return (
        <Form.Field className="mb-4">
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <Form.Control>{renderInput(type)}</Form.Control>
            {meta.error && meta.touched && (
                <Form.Help color="danger">{meta.error}</Form.Help>
            )}
        </Form.Field>
    );
};

export default Input;
