import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import LibraryMenu from "./Libray"; // ✅ Import LibraryMenu

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // ✅ Track dark mode

  return (
    <div
      className={`sidebar d-flex flex-column flex-shrink-0 p-3 ${darkMode ? "dark-mode" : "light-mode"} ${isOpen ? "" : "collapsed"}`}
      style={{ 
        width: isOpen ? "280px" : "80px", 
        transition: "width 0.3s ease"
      }}
    >
      {/* Toggle Button */}
      <button
        className="btn btn-light mb-3"
        onClick={() => setIsOpen(!isOpen)}
        style={{ alignSelf: "flex-end" }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Profile Section */}
      <div className="d-flex flex-column align-items-center text-dark text-center p-4">
        {isOpen && (
          <>
            <div className="d-flex align-items-center w-100 position-relative">
              {/* Background Shape */}
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  backgroundColor: "#c2a3ff",
                  borderRadius: "30% 50% 40% 60%",
                  position: "absolute",
                  left: "-10px",
                  top: "-10px",
                  zIndex: 0,
                }}
              ></div>

              {/* Profile Image */}
              <div
  style={{
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid white",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 1,
    transition: "transform 0.3s ease-in-out", // ✅ Smooth scaling effect
  }}
  className="profile-image"
>
  <img
    src="https://github.com/mdo.png"
    alt="Profile"
    className="w-100 h-100"
    style={{ 
      objectFit: "cover", 
      display: "block", 
      transition: "transform 0.3s ease-in-out" // ✅ Smooth hover effect
    }}
    onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"} // ✅ Grow on hover
    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}   // ✅ Shrink back
    onError={(e) => (e.target.src = "https://via.placeholder.com/75")}
  />
</div>


              <div className="text-start ms-4">
                <h5 className="fw-bold mb-1" style={{ fontSize: "17px", color: "#333" }}>Anissa Ikhelef</h5>
                <p className="text-muted small mb-0" style={{ fontSize: "14px" }}>
                  <i className="bi bi-mortarboard-fill me-1" style={{ color: "#6c5ce7" }}></i> USTHB
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <hr />

      {/* Sidebar Navigation */}
      <ul className="nav nav-pills flex-column mb-2">
        {[
          { src: "house.png", label: "Home" },
          { src: "exam.png", label: "Search" },
          { src: "Recomended.png", label: "Recommended" },
          { src: "Rate_Us.png", label: "Rate Us" },
          { src: "Ressource.png", label: "Upload Resource" },
          { src: "settings.png", label: "Settings" },
        ].map((item, index) => (
          <li key={index} className="nav-item">
            <a href="#" className="nav-link text-dark d-flex align-items-center sidebar-link">
              <img src={`./Assets/${item.src}`} alt={item.label} width="30" height="30" className="me-3" />
              {isOpen && item.label}
            </a>
          </li>
        ))}
         <li className="nav-item">
         <LibraryMenu isOpen={isOpen} />  {/* ✅ Add Library Menu Here */}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
