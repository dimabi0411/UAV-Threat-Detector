import React, { useState } from 'react';
import axios from 'axios';
import { CiSaveDown2 } from "react-icons/ci";
const ThreatResponse = ({ response }) => {
  const [isSaving, setIsSaving] = useState(false); // State to track saving process
  const [saveError, setSaveError] = useState(null); // State to store save error, if any errors

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Validating if the input data exists before parsing it
      if (!response || !response.threat || !response.threat.maxRadius || !response.threat.speed) {
        throw new Error('Validating data failed')
      }

      const parsedMaxRadius = parseFloat(response.threat.maxRadius);
      const parsedSpeed = parseFloat(response.threat.speed);

      //Another option for the post is defining the URL in .env
      const saveResponse = await axios.post('http://localhost:4000/save-threat', {
        location: response.threat.location,
        maxRadius: parsedMaxRadius,
        speed: parsedSpeed,
        closestPlane: response.closestPlane
      });

      console.log('Threat details saved successfully:', saveResponse.data);
    } catch (error) {
      // Setting an error state if request fails
      setSaveError('Error saving threat details');
      console.error('Error saving threat details:', error);
    } finally {
      setIsSaving(false); // Reset saving state after request is complete
    }
  };


  
  if (!response || response.message === 'noPlanes') {
    //console.log(`message: ${response.message}`)
    return <div>No threat response available</div>;
  }

  const { closestPlane, newClosingTime } = response;


  /*console.log(`ClosestPlane: ${closestPlane}. ClosingTime: ${closingTime}`)
  if (!closestPlane) {
    return <div>No planes in the area</div>;
  }*/


  return (

    <div>
      <h2>Threat Response</h2>
      <p>Closing Time: {new Date(newClosingTime).toLocaleString()}</p>
      <h3>Threat Details:</h3>
      <p>Threat Location: {response.threat.location}</p>
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
      {/*<button onClick={handleSave} disabled={isSaving}>Save</button>*/}
      <CiSaveDown2 className='icon' style={{fontSize: "40px", marginTop: "10px"}} onClick={handleSave} disabled={isSaving}/>
      {saveError && <p>{saveError}</p>}
    </div>
  );
};

export default ThreatResponse;
