import React, { useState, useEffect } from "react";
// Pages
import { FirebaseTestingPage, LandingPage } from "./components/pages";

// firebase auth
import app from "./firebase";
import { getAuth } from "firebase/auth";

// bulma components
import { Button, Section } from "reactbulma";

const App = () => {
    const auth = getAuth(app);
    const [showLanding, setShowLanding] = useState(false);
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
        <div className="container">
            <Section>
                <h1>This is the app container</h1>
                <Button primary onClick={() => setShowLanding((prev) => !prev)}>
                    Change showLanding
                </Button>
                <h3>
                    {loggedIn
                        ? `User Logged in, ${user.email}`
                        : "No one logged in"}
                </h3>
            </Section>

            <Section>
                {showLanding ? <LandingPage /> : <FirebaseTestingPage />}
            </Section>
        </div>
    );
};

export default App;
