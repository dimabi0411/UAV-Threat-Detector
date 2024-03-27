import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThreatInput = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [speed, setSpeed] = useState('');
  const [maxRadius, setMaxRadius] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Validate if all the fields are filled
    if (latitude && longitude && speed && maxRadius) {
      handleSubmit();
    }
  }, [latitude, longitude, speed, maxRadius]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitError('');
      const response = await axios.post('http://localhost:4000/threat', {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        speed: parseFloat(speed),
        maxRadius: parseFloat(maxRadius)
      });
      onSubmit(response.data);
    } catch (error) {
      setSubmitError('Error submitting threat details: ' + error.message);
      console.error('Error submitting threat details:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Threat Information</h2>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </div>
      <div>
        <label htmlFor="speed">Speed:</label>
        <input type="text" id="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} />
      </div>
      <div>
        <label htmlFor="maxRadius">Max Radius:</label>
        <input type="text" id="maxRadius" value={maxRadius} onChange={(e) => setMaxRadius(e.target.value)} />
      </div>
      {/*{submitError && <p>{submitError}</p>}*/}
    </div>
  );
};

export default ThreatInput;