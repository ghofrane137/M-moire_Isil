import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ url, onClose }) => {
  const [error, setError] = useState(null);

  // Gestion des erreurs de chargement
  const handleError = (err) => {
    console.error("Erreur lors du chargement du PDF :", err);
    setError("Impossible de charger le PDF : " + err.message);
  };

  // Créer une instance du plugin defaultLayout avec une barre d'outils personnalisée
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [], // Supprimer la barre latérale (optionnel)
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const {
            CurrentPageInput,
            GoToNextPage,
            GoToPreviousPage,
            ZoomIn,
            ZoomOut,
            Download,
            NumberOfPages,
          } = slots;

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "8px",
                backgroundColor: "#f4f4f4",
                borderBottom: "1px solid #ddd",
              }}
            >
              {/* Bouton pour fermer */}
              <div style={{ marginRight: "16px" }}>
                <button
                  onClick={onClose}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Fermer
                </button>
              </div>

              {/* Navigation par page */}
              <div style={{ display: "flex", alignItems: "center", marginRight: "16px" }}>
                <GoToPreviousPage />
                <div style={{ margin: "0 8px", display: "flex", alignItems: "center" }}>
                  <CurrentPageInput /> / <NumberOfPages />
                </div>
                <GoToNextPage />
              </div>

              {/* Contrôles de zoom */}
              <div style={{ display: "flex", alignItems: "center", marginRight: "16px" }}>
                <ZoomOut />
                <span style={{ margin: "0 8px" }}>Zoom</span>
                <ZoomIn />
              </div>

              {/* Bouton de téléchargement */}
              <div style={{ marginLeft: "auto" }}>
                <Download />
              </div>
            </div>
          );
        }}
      </Toolbar>
    ),
  });

  return (
    <div className="pdf-viewer-modal">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div style={{ height: "100%", width: "100%" }}>
            <Viewer
              fileUrl={url}
              plugins={[defaultLayoutPluginInstance]}
              onError={handleError}
            />
          </div>
        </Worker>
      )}
      <style jsx>{`
        .pdf-viewer-modal {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .error-message {
          color: red;
          text-align: center;
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export default PDFViewer;