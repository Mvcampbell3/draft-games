import React from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import PageTop from "../../common/PageTop";
import GameList from "./GameList";

const LandingPage = ({ loggedIn }) => {
    return (
        <div className="page-container">
            <PageTop
                title="Landing Page"
                subtitle="Eventually, things will go here"
                color="info"
            />
            {loggedIn && (
                <div>
                    <h1>This is only seen when someone is logged in</h1>
                    <GameList />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const {
        appState: {
            user: { loggedIn = false },
        },
    } = state;
    return { loggedIn };
};

export default connect(mapStateToProps)(LandingPage);
