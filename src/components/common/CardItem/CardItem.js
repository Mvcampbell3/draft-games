import React from "react";
import "./CardItem.scss";

const CardItem = ({
    title = "Card Title Test",
    description = "This is the card test description, it is where we are going to give you a little more information about what actually this card represents",
    handleClick = () => {},
}) => {
    return (
        <button className="card-item" onClick={handleClick}>
            <h2 className="card-item__title">{title}</h2>
            <p className="card-item__description">{description}</p>
        </button>
    );
};

export default CardItem;
