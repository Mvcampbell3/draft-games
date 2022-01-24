import React, { useState, useEffect } from "react";
import {
    listenToDatabase,
    cleanUpDatabase,
    deleteFromDatabase,
} from "../../../firebase";
import CardItem from "../../common/CardItem";

const GameList = () => {
    const [games, setGames] = useState([]);

    // Create connection to game list database
    useEffect(() => {
        listenToDatabase("/gameList", (data) => {
            if (data) {
                let tempGames = [];
                for (let game in data) {
                    const newGame = data[game];
                    if (newGame.public === "1") {
                        newGame.id = game;
                        tempGames.push(newGame);
                    }
                }
                setGames(tempGames);
            }
        });

        // Kill connection to game list database when component dies
        return () => {
            cleanUpDatabase("/gameList");
        };
    }, []);

    const handleGameClick = (game) => {
        // temp testing of deleting games from gameList
        deleteFromDatabase(`gameList/${game.id}`)
            .then((data) => {
                console.log({ data });
            })
            .catch((err) => {
                console.log({ err });
            });
    };

    return (
        <div className="game-list-container">
            {games.length > 0 ? (
                games.map((game, i) => {
                    const cardProps = {
                        ...game,
                        handleClick: () => handleGameClick(game),
                    };
                    return (
                        <div key={i} className="game-container">
                            <CardItem {...cardProps} />
                        </div>
                    );
                })
            ) : (
                <div>There are not any games :(</div>
            )}
        </div>
    );
};

export default GameList;
