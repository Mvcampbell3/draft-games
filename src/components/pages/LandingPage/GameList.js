import React, { useState, useEffect } from "react";
import { listenToDatabase, cleanUpDatabase } from "../../../firebase";

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

    return (
        <div className="game-list-container">
            {games.map((game, i) => {
                return (
                    <div key={i} className="game-container">
                        <h3>{game.title}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default GameList;
