import React from "react";
import "./Card.css";

const Card = ({ image, title, description }) => {
  return (
    <article className="card__article">
      <img src={image} alt={title} className="card__img" />
      <div className="card__data">
         <h2 className="card__title">{title}</h2>
        <span className="card__description">{description}</span>
        
      </div>
    </article>
  );
};

export default Card;
