import React, { useState } from "react";
import { ChevronRight, ChevronDown, Plus, X, FolderPlus } from "lucide-react";

import  Library  from "../../assets/Library.png";

const LibraryMenu = ({ isOpen }) => {
  const [showLibraries, setShowLibraries] = useState(false);
  const [libraries, setLibraries] = useState([]);
  const [expandedLibraries, setExpandedLibraries] = useState({});
  const [showResourcePopup, setShowResourcePopup] = useState(false);
  const [showCreateLibraryModal, setShowCreateLibraryModal] = useState(false); // State for the modal
  const [newLibraryName, setNewLibraryName] = useState(""); // State for the new library name
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const resources = [
    "React.js Guide",
    "Spring Boot Tutorial",
    "Machine Learning Basics",
    "Algorithms & Data Structures",
    "Database Management",
    "Web Development Best Practices",
  ];

  // Toggle Library Section
  const toggleLibraryList = () => setShowLibraries(!showLibraries);

  // Toggle Individual Library
  const toggleLibrary = (index) => {
    setExpandedLibraries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Open Resource Popup
  const openResourcePopup = (index) => {
    setSelectedLibrary(index);
    setShowResourcePopup(true);
  };

  // Close Popup
  const closeResourcePopup = () => {
    setShowResourcePopup(false);
    setSelectedLibrary(null);
  };

  // Add Resource to Library
  const addResourceToLibrary = (resource) => {
    if (selectedLibrary !== null) {
      setLibraries((prev) =>
        prev.map((lib, idx) =>
          idx === selectedLibrary
            ? { ...lib, resources: [...lib.resources, resource] }
            : lib
        )
      );
    }
    closeResourcePopup();
  };

  // Create a New Library - opens the modal
  const openCreateLibraryModal = () => setShowCreateLibraryModal(true);

  // Close Create Library Modal
  const closeCreateLibraryModal = () => setShowCreateLibraryModal(false);

  // Handle Library Creation
  const createLibrary = () => {
    if (newLibraryName) {
      setLibraries((prev) => [
        ...prev,
        { name: newLibraryName, resources: [] },
      ]);
      setNewLibraryName(""); // Reset the input field
      closeCreateLibraryModal(); // Close the modal after creation
    }
  };

  return (
    <div>
      {/* My Library Toggle */}
      <a
        href="#"
        className="nav-link text-dark d-flex align-items-center"
        onClick={toggleLibraryList}
      >
        <img
          src={Library}
          alt="Library Logo"
          width="30"
          height="30"
          className="me-2"
        />
        {isOpen && "My Library"}
        {isOpen && (
          showLibraries ? <ChevronDown size={18} className="ms-auto" /> : <ChevronRight size={18} className="ms-auto" />
        )}
      </a>

      {/* Library List */}
      {showLibraries && isOpen && (
        <ul className="ps-3 mt-2" style={{ listStyle: "none" }}>
          {libraries.map((library, index) => (
            <li key={index}>
              {/* Library Name with Toggle */}
              <div className="d-flex align-items-center">
                <span
                  onClick={() => toggleLibrary(index)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  {expandedLibraries[index] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  {library.name}
                </span>

                {/* Add Resource Button (Opens Popup) */}
                <button
                  className="btn btn-sm btn-primary ms-auto d-flex align-items-center justify-content-center"
                  style={{ width: "30px", height: "30px", padding: "0", borderRadius: "50%" }}
                  onClick={() => openResourcePopup(index)}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Resources inside Library */}
              {expandedLibraries[index] && (
                <ul className="ps-4">
                  {library.resources.length > 0 ? (
                    library.resources.map((res, idx) => <li key={idx}>{res}</li>)
                  ) : (
                    <li className="text-muted">No resources added</li>
                  )}
                </ul>
              )}
            </li>
          ))}

          {/* Create Library Button (Opens Modal) */}
          <li className="mt-3">
            <button
              className="btn btn-sm btn-outline-primary d-flex align-items-center"
              onClick={openCreateLibraryModal}
            >
              <FolderPlus size={16} className="me-2" />
              Create Library
            </button>
          </li>
        </ul>
      )}

      {/* Resource Popup Modal */}
      {showResourcePopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Close Button */}
            <button className="close-btn" onClick={closeResourcePopup}>
              <X size={20} />
            </button>

            <h5 className="mb-3">Select a Resource</h5>

            {/* Search Bar */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Resource List */}
            <ul className="list-group">
              {resources
                .filter((res) => res.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((res, idx) => (
                  <li key={idx} className="list-group-item">
                    {res}
                    <button className="btn btn-sm btn-success float-end" onClick={() => addResourceToLibrary(res)}>
                      Add
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {/* Create Library Modal */}
      {showCreateLibraryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeCreateLibraryModal}>
              <X size={20} />
            </button>

            <h5>Create New Library</h5>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Library Name"
              value={newLibraryName}
              onChange={(e) => setNewLibraryName(e.target.value)}
            />

            <button className="btn btn-primary" onClick={createLibrary}>
              Create Library
            </button>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 350px;
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default LibraryMenu;
