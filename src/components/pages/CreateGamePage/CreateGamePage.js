import React from "react";
import "./CreateGamePage.scss";

import PageTop from "../../common/PageTop";
import CreateGameForm from "./CreateGameForm";

const CreateGamePage = () => {
    return (
        <div className="page-container">
            <PageTop
                title="Create A Game"
                subtitle="Let the drafting begin"
                color="info"
            />
            <CreateGameForm />
        </div>
    );
};

export default CreateGamePage;
