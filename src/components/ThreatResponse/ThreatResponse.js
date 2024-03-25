import React, { useState } from 'react';
import axios from 'axios';
import { CiSaveDown2 } from "react-icons/ci";

const ThreatResponse = ({ response }) => {
  const [isSaving, setIsSaving] = useState(false); // State to track saving process
  const [saveError, setSaveError] = useState(null); // State to store save error, if any errors

  ////handling the post to the server
  const handleSave = async () => {
    try {
      console.log('trying to save')
      setIsSaving(true); // set saving state to true while request is in process

      //Converting maxRadius and speed to float
      const parsedMaxRadius = parseFloat(response.threat.maxRadius);
      const parsedSpeed = parseFloat(response.threat.speed);

      //Sending a request to save the threat details to database
      const saveResponse = await axios.post('http://localhost:4000/save-threat', {
        location: response.threat.location, // saving the threat location from the response
        maxRadius: parsedMaxRadius, // passing parsed maxRadius
        speed: parsedSpeed, // passing parsed speed
        closestPlane: response.closestPlane // passing closestPlane details from response
      });

      // Log success message
      console.log('Threat details saved successfully:', saveResponse.data);
    } catch (error) {
      // Set error state if request fails
      setSaveError('Error saving threat details');
      console.error('Error saving threat details:', error);
    } finally {
      setIsSaving(false); // Reset saving state after request is complete
    }
  };

  if (!response) {
    return <div>No threat response available</div>;
  }

  const { closestPlane, closingTime } = response;

  return (
    <div>
      <h2>Threat Response</h2>
      <p>Closing Time: {new Date(closingTime).toLocaleString()}</p>
      <h3>Threat Details:</h3>
      <p>Threat Location: {response.threat.location}</p>

      {/* Render closest plane details */}
      {closestPlane && (
        <div>
          <h3>Closest Plane Details:</h3>
          <p>ICAO24: {closestPlane.icao24}</p>
          <p>Call Sign: {closestPlane.callSign}</p>
          <p>Country of Origin: {closestPlane.originCountry}</p>
          <p>Last Updated: {new Date(closestPlane.lastUpdated).toLocaleString()}</p>
          <p>Latitude: {closestPlane.latitude}</p>
          <p>Longitude: {closestPlane.longitude}</p>
          <p>Altitude: {closestPlane.altitude}</p>
          <p>Heading: {closestPlane.heading}</p>
          <p>Velocity: {closestPlane.velocity}</p>
          <p>On Ground: {closestPlane.onGround ? 'Yes' : 'No'}</p>
          <p>Squawk: {closestPlane.squawk}</p>
        </div>
      )}
      {/* Save button */}
      <button onClick={handleSave} disabled={isSaving}>Save</button>
      <CiSaveDown2 className='icon' style={{fontSize: "40px", marginTop: "10px"}}/>
      {saveError && <p>{saveError}</p>}
    </div>
  );
};

export default ThreatResponse;
