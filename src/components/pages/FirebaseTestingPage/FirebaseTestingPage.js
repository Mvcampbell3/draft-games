import React, { useEffect } from "react";
import "./FirebaseTestingPage.scss";

// Firebase Functions

import {
    listenToDatabase,
    cleanUpDatabase,
} from "../../../firebase";

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

    return (
        <div className="page-container">
            <h1>This is the firebase testing page</h1>
        </div>
    );
};

export default FirebaseTestingPage;
