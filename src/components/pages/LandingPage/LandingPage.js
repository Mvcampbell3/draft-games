import React from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import PageTop from "../../common/PageTop";
import { getAuth } from "@firebase/auth";
import { Button, Container } from "react-bulma-components";

const LandingPage = ({ loggedIn = false }) => {
    const auth = getAuth();
    return (
        <div className="page-container">
            <PageTop
                title="Landing Page"
                subtitle="Eventually, things will go here"
                color="info"
            />
            {loggedIn && (
                <Container>
                    <Button
                        onClick={() => {
                            auth.signOut();
                        }}
                    >
                        Sign Out
                    </Button>
                </Container>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const {
        appState: {
            user: { loggedIn },
        },
    } = state;
    return { loggedIn, ...ownProps };
};

export default connect(mapStateToProps)(LandingPage);
