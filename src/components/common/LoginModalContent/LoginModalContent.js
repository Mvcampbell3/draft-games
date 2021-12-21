import React from "react";
import "./LoginModalContent.scss";

// Formik imports
import { Formik } from "formik";
import initialValues from "./formik/initialValues";
import validation from "./formik/validation";
import { Form, Box, Button, Heading } from "react-bulma-components";

const LoginModalContent = () => {
    return (
        <Box className="modal-container">
            <Heading textAlign="center">
                Login to your Draft Games account!
            </Heading>
            <Formik
                initialValues={initialValues}
                validate={validation}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Form.Label>Email</Form.Label>
                            <Form.Control>
                                <Form.Input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </Form.Control>
                            {errors.email && touched.email && (
                                <Form.Help color="danger">
                                    {errors.email}
                                </Form.Help>
                            )}
                        </Form.Field>

                        <Form.Field>
                            <Form.Label>Password</Form.Label>
                            <Form.Control>
                                <Form.Input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </Form.Control>
                            {errors.password && touched.password && (
                                <Form.Help color="danger">
                                    {errors.password}
                                </Form.Help>
                            )}
                        </Form.Field>
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default LoginModalContent;
