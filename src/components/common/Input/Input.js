import React, { useRef } from "react";
import "./Input.scss";

import { Field, Input as BulmaInput, Control } from "reactbulma";

const Input = ({ label = "", id = "", ...props }) => {
    return (
        <Field className="mb-4">
            <label htmlFor={id}>{label}</label>
            <Control>
                <BulmaInput id={id} {...props} />
            </Control>
        </Field>
    );
};

export default Input;
