import React from "react";

const features = [
  { id: "Downloads", title: "Downloads", number: "45", src: "./Assets/download.png", alt: "Download Icon", description: "Paragraph of text beneath the heading to explain the heading." },
  { id: "Saved", title: "Saved", number: "06", src: "./Assets/saved.png", alt: "Saved Icon", description: "Paragraph of text beneath the heading to explain the heading." },
  { id: "Views1", title: "Views", number: "89", src: "./Assets/view.png", alt: "Views Icon", description: "Paragraph of text beneath the heading to explain the heading." },
  { id: "Views2", title: "Ressource Acceptee", number: "07", src: "./Assets/validation.png", alt: "Validate Icon", description: "Paragraph of text beneath the heading to explain the heading." },
];

const Statistique = () => {
  return (
    <div className="container">
      <div className="row row-cols-4 g-4 m-4 flex-nowrap overflow-auto">
        {features.map((feature, index) => (
          <div key={index} className="col">
            <div className="card p-4 shadow-sm d-flex flex-column gap-3 rounded-3">
              {/* Title & Image Row */}
              <div className="d-flex align-items-center">
                <h6 className="mb-0 flex-grow-1">{feature.title}</h6>
                <img width="40" height="40" className="ms-2" src={feature.src} alt={feature.alt} />
              </div>

              {/* Number */}
              <h2 className="text-body-primary mb-0">{feature.number}</h2>

              {/* Description */}
              <p className="text-body-secondary">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistique;
