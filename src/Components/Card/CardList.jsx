import React from "react";
import Card from "./Card";
import "./Card.css";
import Card1 from "../../assets/Card1-removebg-preview.png";
import Card2 from "../../assets/Card2-removebg-preview.png";
import Card3 from "../../assets/Card3-removebg-preview.png";

const cardsData = [
  {
    id: 1,
    image: Card1,
    title: " Une bibliothèque de ressources enrichie🚀",
    description: "Accédez à des ressources variées : cours, exercices, tutoriels et projets, adaptés aux étudiants et enseignants, disponibles en PDF, diapositives..ect.",
  },
  {
    id: 2,
    image: Card2,
    title: "Une recherche avancée et intuitive🔎",
    description: "Recherchez par titre, catégorie ou niveau, affinez avec des filtres dynamiques et sauvegardez vos ressources favorites dans 'Ma bibliothèque'.",
  },
  {
    id: 3,
    image: Card3,
    title: "Des statistiques et un suivi personnalisé📊",
    description: "Suivez les ressources populaires, accédez aux statistiques d'utilisation et profitez de recommandations personnalisées.",
  },
];

const CardList = () => {
  return (
    <div className="my-card-container">
      <h2 className="unique-title">Ce qui nous rend unique!</h2>
      <div className="card__container">
        {cardsData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
