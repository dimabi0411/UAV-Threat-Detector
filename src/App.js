import React, { useState } from 'react';
import HeadImage from './components/HeaderImage/HeadImage';
import ThreatInput from './components/ThreatInput/ThreatInput';
import ThreatResponse from './components/ThreatResponse/ThreatResponse';
import Appcss from './App.css'

function App() {
  const [threatResponse, setThreatResponse] = useState(null);

  const handleThreatSubmit = (response) => {
    // Set the response received from the server
    setThreatResponse(response);
  };

  return (
    <div className="app-container">
      <div className='comp-container'>
        <HeadImage />
        <div className="ThreatInfo-container">
          <ThreatInput onSubmit={handleThreatSubmit} />
        </div>
        <div className="ThreatResponse-container">
          <ThreatResponse response={threatResponse} />
        </div>
      </div>
    </div>
  );
}

export default App;
