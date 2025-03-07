import React from "react";
import "../styles/FunnyNameCard.css"; 

const FunnyNameCard = ({ name, description }) => {
  return (
    <div className="funny-name-card">
      <h2 className="funny-name">{name}</h2>
      <p className="funny-description">{description}</p>
    </div>
  );
};

export default FunnyNameCard;
