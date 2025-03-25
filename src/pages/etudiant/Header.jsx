import React, { useState, useEffect } from "react";
import { Bell, Globe, Moon, Sun, LogOut } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [notifications, setNotifications] = useState([]);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Change Language
  const handleLanguageChange = (lang) => setLanguage(lang);

  // Fetch Notifications from Backend
  useEffect(() => {
    fetch("https://api.example.com/notifications") // Replace with your actual API
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <nav 
      className={`navbar navbar-expand-lg shadow-sm ${darkMode ? "dark-mode text-white" : "light-mode text-dark"}`} 
    >
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        
        {/* Logo & Site Name */}
        <a href="#" className="navbar-brand d-flex align-items-center text-decoration-none">
          <img src="Assets/Logo.png" alt="Unihub Logo" width="70" height="70" className="rounded-circle me-3" />
          <h2 className="mb-0">
            <span className="uni">Uni</span>
            <span className="hub">Hub</span>
          </h2>
        </a>

        {/* Icons Section */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Notifications (Scrollable Dropdown) */}
          <div className="dropdown">
            <a href="#" className="text-dark position-relative" data-bs-toggle="dropdown">
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                  {notifications.length}
                </span>
              )}
            </a>
            <ul className="dropdown-menu dropdown-menu-end shadow" 
                style={{ maxHeight: "250px", overflowY: "auto", width: "300px" }}> 
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href={notif.link || "#"}>
                      🔔 {notif.message}
                    </a>
                  </li>
                ))
              ) : (
                <li className="dropdown-item text-center text-muted">No notifications</li>
              )}
            </ul>
          </div>

          {/* Language Selector */}
          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
              <Globe size={20} className="me-1" /> {language}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li><button className="dropdown-item" onClick={() => handleLanguageChange("EN")}>🇬🇧 English</button></li>
              <li><button className="dropdown-item" onClick={() => handleLanguageChange("FR")}>🇫🇷 French</button></li>
              <li><button className="dropdown-item" onClick={() => handleLanguageChange("AR")}>🇸🇦 Arabic</button></li>
            </ul>
          </div>

          {/* Dark/Light Mode Toggle */}
          <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Sign Out Button */}
          <button className="btn btn-danger p-2 px-3 rounded-3 shadow-sm d-flex align-items-center">
            <LogOut size={20} className="me-2" /> 
            <strong>Sign Out</strong>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Header;
