import React from "react";

const recommended = [
    { id: "1", subject: "Mathematics", title: "Calculus Final Exam 2025", teacher: "Mr Max", textColor: "#6B5B95", bgColor: "#E6DFF1" }, // Soft Purple
    { id: "2", subject: "Physics", title: "Mechanics Exam 2019", teacher: "Mme Katrine", textColor: "#3C6997", bgColor: "#D6EAF8" }, // Soft Blue
    { id: "3", subject: "Chemistry", title: "Organic Chemistry Test", teacher: "Dr. Smith", textColor: "#E59866", bgColor: "#FAE5D3" }, // Soft Orange
    { id: "4", subject: "Biology", title: "Genetics Final Exam", teacher: "Prof. Allen", textColor: "#6B5B95", bgColor: "#E6DFF1" }, // Soft Purple
    { id: "5", subject: "History", title: "World War II Exam", teacher: "Dr. Johnson", textColor: "#3C6997", bgColor: "#D6EAF8" }, // Soft Blue
];

function Recommended() {
    return (
        <div 
            style={{
                maxHeight: "300px", // Set max height to enable scrolling
                overflowY: "auto", // Enable vertical scrolling
                scrollbarWidth: "thin", // Custom scrollbar styling (for Firefox)
                scrollbarColor: "#888 transparent", // Scrollbar color
            }}
            className="p-2"
        >
            {recommended.map((item) => (
                <div key={item.id} className="card p-3 shadow-sm d-flex flex-column gap-2 rounded-3 m-2">
                    
                    {/* Top Section: Subject Button */}
                    <div className="d-flex justify-content-between align-items-center">
                        <button 
                            className="btn rounded-pill px-3 py-1 fw-semibold" 
                            style={{ backgroundColor: item.bgColor, color: item.textColor, border: "none" }}
                        >
                            {item.subject}
                        </button>
                    </div>

                    {/* Title & Teacher */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <h6 className="text-body-primary mb-1">{item.title}</h6>
                            <p className="text-body-secondary small">{item.teacher}</p>
                        </div>

                        {/* View Details Link (Instead of Button) */}
                        <a 
                            href="#" 
                            className="view-details-link"
                            style={{
                                textDecoration: "underline",
                                color: "#7D7D7D", // Soft grey
                                fontWeight: "bold",
                                transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.color = "#5A5A5A"; // Darker grey on hover
                                e.target.style.transform = "scale(1.1)"; // Slightly bigger on hover
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = "#7D7D7D"; // Restore soft grey
                                e.target.style.transform = "scale(1)"; // Restore normal size
                            }}
                        >
                            View Details
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Recommended;
