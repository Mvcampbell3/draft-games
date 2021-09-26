import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Pages
import { FirebaseTestingPage, LandingPage } from "./components/pages";

// firebase auth
import app from "./firebase";
import { getAuth } from "firebase/auth";

const App = () => {
    const auth = getAuth(app);
    const [loggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribeUser = auth.onAuthStateChanged(
            (user) => {
                console.log("user changed", { user });
                if (user) {
                    setisLoggedIn(true);
                    setUser(user);
                } else {
                    setisLoggedIn(false);
                    setUser({});
                }
            },
            (err) => {
                console.log("err getting user", { err });
            },
            (completed) => {
                console.log("completed", { completed });
            },
        );
        return () => {
            unsubscribeUser();
        };
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/testing" component={FirebaseTestingPage} />
            </Switch>
        </Router>
    );
};

export default App;
