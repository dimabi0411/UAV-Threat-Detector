import React, { useState } from 'react';
import axios from 'axios';

const ThreatInput = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [speed, setSpeed] = useState('');
  const [maxRadius, setMaxRadius] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/threat', {
        latitude,
        longitude,
        speed,
        maxRadius
      });

      // Pass the response to the parent component
      onSubmit(response.data);
    } catch (error) {
      console.error('Error submitting threat:', error);
    }
  };


  return (
    <div>
      <h2>Threat Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </div>
        <div>
          <label>Speed:</label>
          <input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
        </div>
        <div>
          <label>Max Radius:</label>
          <input type="text" value={maxRadius} onChange={(e) => setMaxRadius(e.target.value)} />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ThreatInput;
