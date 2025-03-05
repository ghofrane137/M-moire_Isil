import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import statistique_img from "../../assets/imageedit_17_3426417843.png";
import "./Statistiques.css";
import CountUp from "react-countup";

const Statistiques = () => {
  const { ref, inView } = useInView({ triggerOnce: false }); // L'animation se joue une seule fois

  return (
    <div className="statistique" ref={ref}>
      <div className="statistique-left">
        <h3>Statistiques</h3>
        <h2>Découvrez nos statistiques clés pour les étudiants</h2>
        <p>Nous avons rassemblé des milliers de documents pour vous aider dans votre préparation.</p>
        <p>Rejoignez notre communauté croissante d'étudiants qui utilisent notre plateforme.</p>

        {/* Section d'incrémentation */}
        <div className="stat-numbers">
          <div className="stat-box">
            <h3>
              +{inView ? <CountUp start={0} end={1000} duration={3} /> : "0"}
            </h3>
            <p>Étudiants inscrits</p>
          </div>
          <div className="stat-box">
            <h3>
              {inView ? <CountUp start={0} end={75} duration={3} /> : "0"}%
            </h3>
            <p>des ressources disponibles</p>
          </div>
        </div>
      </div>
      <div className="statistique-right">
        <img src={statistique_img} alt="Illustration des statistiques" className="statistique_img" />
      </div>
    </div>
  );
};

export default Statistiques;
