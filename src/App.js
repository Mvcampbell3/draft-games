import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setLoginModalOpen } from "./redux/actions";

// Pages
import {
    LandingPage,
    CreateGamePage,
} from "./components/pages";

// Global Components
import Modal from "./components/common/Modal";
import LoginModalContent from "./components/common/LoginModalContent";

// firebase auth
import app from "./firebase";
import { getAuth } from "firebase/auth";

const App = ({ setUser, loginModalOpen = false, setLoginModalOpen }) => {
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribeUser = auth.onAuthStateChanged(
            (user) => {
                console.log("user changed", { user });
                if (user) {
                    setUser({
                        loggedIn: true,
                        email: user.email,
                        id: user.uid,
                    });
                } else {
                    setUser({ loggedIn: false });
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

    const handleLoginModalClose = () => {
        setLoginModalOpen(false);
    };

    return (
        <Router>
            {/* Login Modal */}
            <Modal show={loginModalOpen} handleClose={handleLoginModalClose}>
                <LoginModalContent />
            </Modal>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/create" component={CreateGamePage} />
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => {
    const {
        appState: { loginModalOpen },
    } = state;
    return { loginModalOpen };
};

const mapDispatchToProps = {
    setUser,
    setLoginModalOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
