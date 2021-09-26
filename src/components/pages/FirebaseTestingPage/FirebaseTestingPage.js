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
        <div className="page-container">
            <h1>This is the firebase testing page</h1>
            <h2>Create User</h2>
            <form onSubmit={handleCreateSubmit}>
                <div className="field-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="field-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="field-group">
                    <input type="submit" value="Send" />
                </div>
            </form>

            <h2>Sign In</h2>

            <form onSubmit={handleLoginSubmit}>
                <div className="field-group">
                    <label htmlFor="email-login">Email</label>
                    <input
                        type="email"
                        id="email-login"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="field-group">
                    <label htmlFor="password-login">Password</label>
                    <input
                        type="password"
                        id="password-login"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="field-group">
                    <input type="submit" value="Send" />
                </div>
            </form>
        </div>
    );
};

export default FirebaseTestingPage;
