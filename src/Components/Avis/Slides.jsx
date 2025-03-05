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
  return (
    <div className="slider-container">
        <h2 >Témoignages de nos utilisateurs 🗣️🌟</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20} // Espace entre les cartes
        slidesPerView="auto"
        centeredSlides={true} // Centrer les cartes
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Pause au survol
        }}
        speed={7500}
        loop={true}
      >
        {avisList.map((avis, index) => (
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
