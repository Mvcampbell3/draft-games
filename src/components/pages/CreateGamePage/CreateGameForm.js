import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../../common/Input/Input";
import initialValues from "./formik/initialValues";
import { pushToDatabase } from "../../../firebase";
import { gameSchema } from "./formik/validation";
import { Button } from "react-bulma-components";

import "./CreateGameForm.scss";

const CreateGameForm = ({ id }) => {
    const handleSubmit = (values) => {
        if (id) {
            values.creator = id;
            console.log({ values, id });
            pushToDatabase("/gameList", values, (returnData) => {
                console.log("running db push callback", {
                    returnData,
                    key: returnData.key,
                });
                if (returnData && returnData.key) {
                    // submit over
                }
            });
        }

        // error display for not being a user ?
    };

    const numberOfPlayersArray = [1, 2, 3, 4, 5];
    const numberOfRoundsArray = [1, 2, 3, 4, 5, 6, 7, 8];

    const formikProps = {
        initialValues,
        validationSchema: gameSchema,
        onSubmit: handleSubmit,
    };

    return (
        <div className="create-game-form-container">
            <Formik {...formikProps}>
                <Form>
                    <Input
                        id="title"
                        name="title"
                        label="Title of the game"
                        type="field"
                    />
                    <Input
                        id="description"
                        name="description"
                        label="Description"
                        type="textarea"
                    />
                    <Input
                        id="playerCount"
                        name="playerCount"
                        label="Number of Players"
                        type="select"
                    >
                        {numberOfPlayersArray.map((playerNumber) => (
                            <option
                                key={`player-${playerNumber}`}
                                value={playerNumber}
                            >
                                {playerNumber}
                            </option>
                        ))}
                    </Input>
                    <Input
                        id="roundCount"
                        name="roundCount"
                        label="Number of Rounds"
                        type="select"
                    >
                        {numberOfRoundsArray.map((roundNumber) => (
                            <option
                                key={`player-${roundNumber}`}
                                value={roundNumber}
                            >
                                {roundNumber}
                            </option>
                        ))}
                    </Input>
                    <Input
                        id="public"
                        name="public"
                        label="Public or Private game?"
                        type="select"
                    >
                        <option value="1">Public</option>
                        <option value="0">Private</option>
                    </Input>
                    <Button type="submit" color="info">
                        Create Game
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => {
    const {
        appState: {
            user: { id = "" },
        },
    } = state;

    return { id };
};

export default connect(mapStateToProps)(CreateGameForm);
