import React from "react";
import Recomended from "./Recomended";

import pdf from "../../assets/pdf.png";
import saved from "../../assets/saved.png";
import download from "../../assets/download.png";


const activity = [
  { id: "1", subject: "Mathematics", time: "Viewed yesterday" },
  { id: "2", subject: "Physics", time: "Viewed today" },
  { id: "3", subject: "Computer Science", time: "Viewed 2 days ago" },
];

function Activity() {
  return (
    <div className="container d-flex justify-content-center py-4"> {/* Center content */}
      <div className="row w-100 justify-content-center"> {/* Ensures columns stay centered */}
        
        {/* Recent Activity Card */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm rounded-3">
            <h2>Recent Activity</h2>

            {/* Mapping through Activity List */}
            {activity.map((item) => (
              <div key={item.id}>
                <hr />
                <div className="d-flex align-items-center">
                  {/* PDF Icon */}
                  <img width="30" height="30" className="me-3 align-self-start mt-1" src={pdf} alt="pdf icon" />

                  {/* Subject and Time */}
                  <div className="d-flex flex-column flex-grow-1">
                    <h6 className="text-body-primary mb-0">{item.subject}</h6>
                    <p className="text-body-secondary small">{item.time}</p>
                  </div>

                  {/* Action Icons */}
                  <img width="20" height="20" className="ms-2" src={saved} alt="saved icon" />
                  <img width="20" height="20" className="ms-2" src={download} alt="download icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Card */}
        <div className="col-md-6">
          <div className="card shadow-sm rounded-3">
            <h2 className="mt-4 ms-4 mb-0">Recommended</h2>
            <Recomended />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Activity;
