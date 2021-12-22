import React from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import PageTop from "../../common/PageTop";

const LandingPage = () => {
    return (
        <div className="page-container">
            <PageTop
                title="Landing Page"
                subtitle="Eventually, things will go here"
                color="info"
            />
        </div>
    );
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(LandingPage);
