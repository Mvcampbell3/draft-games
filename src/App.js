import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "./redux/actions";

// Pages
import { FirebaseTestingPage, LandingPage } from "./components/pages";

// firebase auth
import app from "./firebase";
import { getAuth } from "firebase/auth";

const App = ({ user = {}, setUser }) => {
    const auth = getAuth(app);
    const [loggedIn, setisLoggedIn] = useState(false);

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

const mapStateToProps = (state) => {
    console.log({ state });
    const {
        appState: { user },
    } = state;
    return {
        user,
    };
};

const mapDispatchToProps = {
    setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
