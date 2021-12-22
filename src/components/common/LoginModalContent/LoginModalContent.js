import React from "react";
import { connect } from "react-redux";
import "./LoginModalContent.scss";

// Redux actions
import { setLoginModalOpen } from "../../../redux/actions";

// Formik imports
import { Formik } from "formik";
import initialValues from "./formik/initialValues";
import validation from "./formik/validation";
import { Form, Box, Button, Heading } from "react-bulma-components";

// Firebase imports
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import app, {
    writeUserData,
    listenToDatabase,
    cleanUpDatabase,
} from "../../../firebase";

import { defaultUser } from "../../../firebase/defaultValues";

const LoginModalContent = ({ setLoginModalOpen }) => {
    const auth = getAuth(app);

    const handleLoginSubmit = (email, password, setSubmitting) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setSubmitting(false);
                setLoginModalOpen(false);
                console.log({ user: result.user });
            })
            .catch((err) => console.log({ err }));
    };

    return (
        <Box className="modal-container">
            <Heading textAlign="center">
                Login to your Draft Games account!
            </Heading>
            <Formik
                initialValues={initialValues}
                validate={validation}
                onSubmit={(values, { setSubmitting }) => {
                    handleLoginSubmit(
                        values.email,
                        values.password,
                        setSubmitting,
                    );
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

const mapStateToProps = (state) => {
    const {
        appState: { loginModalOpen },
    } = state;
    return {
        loginModalOpen,
    };
};

const mapDispatchToProps = {
    setLoginModalOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalContent);
