import React from 'react';
import './Modal.css';
import { LuPanelRightClose } from "react-icons/lu";

const Modal = ({ closeModal, savedData }) => {
  // Check if savedData exists and is not empty or else I'll have a headache
  if (!savedData || savedData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 style={{marginLeft: "10px"}}>Saved Data</h2>
          <LuPanelRightClose onClick={closeModal} style={{fontSize: "40px", marginRight: "10px", cursor: "pointer"}}/>
        </div>

        <div className="modal-body">

          {savedData.map((data, index) => (
            
            <div key={index} className="threat-container">
              <div className="threat-box">
                <h4>Threat Details</h4>
                <p>Location: {data.location}</p>
                <p>Speed: {data.speed}</p>
                <p>Radius: {data.radius}</p>
              </div>

              {data.planes && data.planes.length > 0 && (
                <div className="plane-container">
                  <h4>Planes</h4>
                  {data.planes.map((plane, planeIndex) => (
                    <div key={planeIndex} className="plane-box">
                      <p>ICAO24: {plane.icao24}</p>
                      <p>CallSign: {plane.callSign}</p>
                      <p>Origin Country: {plane.originCountry}</p>
                      <p>Location: {plane.latitude}, {plane.longitude}</p>
                      <p>Squawk: {plane.squawk}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
