import React, { useEffect, useState } from "react";
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

// Bulma Components

import {Button } from "reactbulma";

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

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    const {
                        user: { uid },
                    } = result;
                    const userItem = defaultUser({ email, id: uid });
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

    return (
        <div className="page-container content">
            <h1>This is the firebase testing page</h1>
            <h2>Create User</h2>
            <form onSubmit={handleCreateSubmit}>
                <div className="field-group">
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="field-group">
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="field-group">
                    <Button type="submit">Send</Button>
                </div>
            </form>

            <h2>Sign In</h2>

            <form onSubmit={handleLoginSubmit}>
                <div className="field-group">
                    <Input
                        label="Email"
                        type="email"
                        id="email-login"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="field-group">
                    <Input
                        label="Password"
                        type="password"
                        id="password-login"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="field-group">
                    <Button type="submit">Send</Button>
                </div>
            </form>
        </div>
    );
};

export default FirebaseTestingPage;
