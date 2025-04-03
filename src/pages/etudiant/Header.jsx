import React, { useState, useEffect } from "react";
import { Bell, Globe, Moon, Sun, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./Header.css"; // Créez ce fichier pour les styles personnalisés

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Change Language
  const handleLanguageChange = (lang) => setLanguage(lang);

  // Fetch Notifications from Backend (Placeholder)
  useEffect(() => {
    fetch("https://api.example.com/notifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  // Logout Function - Redirect to Home
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in local storage.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav
  className={`navbar navbar-expand-lg shadow-sm fixed-header ${
    darkMode ? "dark-mode text-white" : "light-mode text-dark"
  }`}
>
      <div className="container-fluid px-4">
        {/* Logo */}
        <a
          href="#"
          className="navbar-brand d-flex align-items-center text-decoration-none"
        >
          <img
            src={logo}
            alt="Unihub Logo"
            width="60"
            height="50"
            className="rounded-circle me-2 d-block"
          />
          <h2 className="mb-0 d-none d-md-block">
            <span className="uni">Uni</span>
            <span className="hub">Hub</span>
          </h2>
        </a>

        {/* Hamburger Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <div className="ms-auto d-flex align-items-center gap-3">
            {/* Notifications Dropdown */}
            <div className="dropdown">
              <a
                href="#"
                className={`position-relative ${darkMode ? 'text-white' : 'text-dark'}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                    {notifications.length}
                  </span>
                )}
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end shadow ${darkMode ? 'dark-dropdown' : ''}`}
                style={{ maxHeight: "250px", overflowY: "auto", width: "300px" }}
              >
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href={notif.link || "#"}>
                        🔔 {notif.message}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item text-center text-muted">
                    No notifications
                  </li>
                )}
              </ul>
            </div>

            {/* Language Dropdown */}
            <div className="dropdown">
              <button
                className={`btn btn-outline-secondary dropdown-toggle ${darkMode ? 'text-white' : ''}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Globe size={18} className="me-1" /> {language}
              </button>
              <ul className={`dropdown-menu dropdown-menu-end shadow ${darkMode ? 'dark-dropdown' : ''}`}>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange("EN")}
                  >
                    🇬🇧 English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange("FR")}
                  >
                    🇫🇷 French
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange("AR")}
                  >
                    🇸🇦 Arabic
                  </button>
                </li>
              </ul>
            </div>

            {/* Dark Mode Toggle */}
            <button
              className={`btn btn-outline-secondary me-3 ${darkMode ? 'text-white' : ''}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Sign Out Button */}
            <button
              style={{
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              }}
              className="btn p-1 px-2 rounded-3 shadow-sm d-flex align-items-center"
              onClick={handleLogout}
            >
              <LogOut size={25} className="me-1" />
              <strong style={{ fontSize: "14px" }}>Sign Out</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;