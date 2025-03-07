import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "./Slides.css";

const avisList = [
  { note: 5, commentaire: "Super plateforme ! Très utile." },
  { note: 4, commentaire: "J'aime beaucoup, mais peut être améliorée." },
  { note: 5, commentaire: "Excellente interface et contenu !" },
  { note: 3, commentaire: "Bon début, mais manque quelques fonctionnalités." },
];

const Slides = () => {
  // Dupliquer les diapositives pour une boucle infinie fluide
  const duplicatedAvisList = [...avisList, ...avisList, ...avisList];

  return (
    <div className="slider-container">
      <h2>Témoignages de nos utilisateurs 🗣️🌟</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0} // Pas d'espace entre les diapositives
        slidesPerView="auto" // Ajuste automatiquement le nombre de diapositives visibles
        loop={true} // Boucle infinie
        autoplay={{
          delay: 1, // Défilement continu
          disableOnInteraction: false, // Ne pas s'arrêter lors de l'interaction
          pauseOnMouseEnter: true, // Pause au survol
        }}
        speed={5000} // Vitesse de défilement (ajustez selon vos besoins)
        freeMode={{
          enabled: true, // Mode libre pour un défilement fluide
          momentum: false, // Désactive l'effet d'inertie
        }}
        allowTouchMove={false} // Désactive le glissement manuel
      >
        {duplicatedAvisList.map((avis, index) => (
          <SwiperSlide key={index} className="review-card">
            <div className="stars">
              {Array.from({ length: avis.note }, (_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="review-text">{avis.commentaire}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slides;