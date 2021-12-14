import React from "react";
import "./CreateGamePage.scss";

import PageTop from "../../common/PageTop";

const CreateGamePage = () => {
    return (
        <div className="page-container">
            <PageTop
                title="Create A Game"
                subtitle="Let the drafting begin"
                color="info"
            />
        </div>
    );
};

export default CreateGamePage;
