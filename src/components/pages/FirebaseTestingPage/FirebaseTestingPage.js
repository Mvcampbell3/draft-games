import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FirebaseTestingPage.scss";

// Firebase Functions

import app, {
    writeUserData,
    listenToDatabase,
    cleanUpDatabase,
} from "../../../firebase";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { defaultUser } from "../../../firebase/defaultValues";

// Components

import Input from "../../common/Input";
import PageTop from "../../common/PageTop";

// Bulma Components
import {
    Button,
    Container,
    Box,
    Level,
    Hero,
    Heading,
    Tabs,
} from "react-bulma-components";

const FirebaseTestingPage = () => {
    // callback function on what to do with the data we get back
    // passed to the listen function
    const logOutData = (data) => {
        console.log({ data });
    };

    // useEffect for listening to users ref in realtime db
    useEffect(() => {
        console.log("this useEffect only builds once");

        // function in firebase file that sets up onValue listener to rtdb
        listenToDatabase("/users", logOutData);

        // Clean Up
        return () => {
            console.log("killing component");
            // runs off on db user ref
            cleanUpDatabase("/users");
        };
    }, []);

    // Logging in users state
    const auth = getAuth(app);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [displayLogin, setDisplayLogin] = useState(true);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (email && password && username) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    const {
                        user: { uid },
                    } = result;
                    const userItem = defaultUser({ email, username, id: uid });
                    writeUserData(uid, userItem);
                })
                .catch((err) => console.log({ err }));
        } else {
            console.log("you failed to most basic validation");
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    console.log({ user: result.user });
                })
                .catch((err) => console.log({ err }));
        }
    };

    const handleFormToggle = (e) => {
        e.preventDefault();
        setDisplayLogin((prev) => !prev);
    };

    return (
        <>
            <PageTop
                title="Testing Page"
                subtitle="For the moment, it is just auth stuff"
                color="info"
            />
            <Container>
                <div className="page-container">
                    {displayLogin ? (
                        <Box>
                            <h2>Sign In</h2>

                            <form onSubmit={handleLoginSubmit}>
                                <div className="field-group">
                                    <Input
                                        label="Email"
                                        type="email"
                                        id="email-login"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                    />
                                </div>
                                <div className="field-group">
                                    <Input
                                        label="Password"
                                        type="password"
                                        id="password-login"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                    />
                                </div>
                                <div className="field-group">
                                    <Level>
                                        <Level.Side align="left">
                                            <Level.Item>
                                                <Button
                                                    color="dark"
                                                    type="submit"
                                                >
                                                    Send
                                                </Button>
                                            </Level.Item>
                                        </Level.Side>
                                        <Level.Side align="right">
                                            <Level.Item>
                                                <Button
                                                    color="light"
                                                    onClick={handleFormToggle}
                                                >
                                                    Not a user yet?
                                                </Button>
                                            </Level.Item>
                                        </Level.Side>
                                    </Level>
                                </div>
                            </form>
                        </Box>
                    ) : (
                        <Box>
                            <h2>Create User</h2>

                            <form onSubmit={handleCreateSubmit}>
                                <div className="field-group">
                                    <Input
                                        label="Email"
                                        type="email"
                                        id="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                    />
                                </div>
                                <div className="field-group">
                                    <Input
                                        label="Username"
                                        type="text"
                                        id="username"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        value={username}
                                    />
                                </div>
                                <div className="field-group">
                                    <Input
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                    />
                                </div>
                                <div className="field-group">
                                    <Level>
                                        <Level.Side align="left">
                                            <Level.Item>
                                                <Button
                                                    color="dark"
                                                    type="submit"
                                                >
                                                    Send
                                                </Button>
                                            </Level.Item>
                                        </Level.Side>
                                        <Level.Side align="right">
                                            <Level.Item>
                                                <Button
                                                    color="light"
                                                    onClick={handleFormToggle}
                                                >
                                                    Already a user?
                                                </Button>
                                            </Level.Item>
                                        </Level.Side>
                                    </Level>
                                </div>
                            </form>
                        </Box>
                    )}
                </div>
            </Container>
        </>
    );
};

export default FirebaseTestingPage;
