const express = require('express');
const router = express.Router();
const axios = require('axios');

//https://openskynetwork.github.io/opensky-api/

//route handling HTTP POST requests from ThreatInput
router.post('/threat', async (req, res) => {
  try {
    const { latitude, longitude, speed, maxRadius } = req.body;

    console.log(`Received UAV Threat Details: [Latitude, Longitude]: (${latitude}, ${longitude}, Speed: ${speed}, maxRadius: ${maxRadius} }`);
    console.log('____________________________________________________________________');
    console.log('');
    // Calculating the latitude and longitude ranges [parseFloat Parsing a string value (number) to a floating-point number]
    //How I'm creating the radius of a threatened area:
      // *Centeral Point - (Latitude, Longitude) represented as a central point on earth's surface.
      // *Radius - The maximum radius, defines the distance from Central Point to the edge of the Radius.
      // *Creating the boundary - Using minimum of latitude, minimum of longitude, maximum of latitude and maximum of longitude. 
          //Calculating the coundary of the circular area (the radius) for the API to filter possibly nearby planes inside the radius. 
    const minLat = parseFloat(latitude) - parseFloat(maxRadius); //minimum latitude of the area
    const maxLat = parseFloat(latitude) + parseFloat(maxRadius); // maximum latitude of the area.
    const minLon = parseFloat(longitude) - parseFloat(maxRadius); //minimum longitude of the area.
    const maxLon = parseFloat(longitude) + parseFloat(maxRadius); // maximum latitude of the area.

    console.log('Latitude range:', { minLat, maxLat });
    console.log('Longitude range:', { minLon, maxLon });
    console.log('');

    // Using OpenSky Network API to find nearby friendly planes within the radius range. :)
    // I create HTTP GET request using 'axios' to OpenSky Network API to fetch nearby plane info inside the specified radius.
    const response = await axios.get(`https://opensky-network.org/api/states/all?lamin=${minLat}&lomin=${minLon}&lamax=${maxLat}&lomax=${maxLon}`);

    // Extracting information from the API response (the state vectors).
    const stateVectors = response.data.states;

    // Filter state vectors to find nearby planes
    const nearbyPlanes = stateVectors.map(stateVector => {
      const icao24 = stateVector[0];
      const callSign = stateVector[1];
      const originCountry = stateVector[2];
      const lastUpdated = new Date(stateVector[3] * 1000); // Convert Unix timestamp to JS Date object (multiply by 1000 to convert it from seconds to milliseconds).
      const latitude = stateVector[6];
      const longitude = stateVector[5];
      const altitude = stateVector[7];
      const heading = stateVector[10];
      const velocity = stateVector[9];
      const onGround = stateVector[8] === 1;
      const squawk = stateVector[14];

      return {
        icao24,
        callSign,
        originCountry,
        lastUpdated,
        latitude,
        longitude,
        altitude,
        heading,
        velocity,
        onGround,
        squawk
      };
    });

    // finding the closest plane by sorting the nearby planes into an array using .sort(a,b).
    nearbyPlanes.sort((a, b) => calculateDistance(latitude, longitude, a.latitude, a.longitude) - calculateDistance(latitude, longitude, b.latitude, b.longitude));
    const closestPlane = nearbyPlanes[0];
    console.log(`Nearby Planes:`);
    console.log('....................');
    //Logging nearbu planes:
    nearbyPlanes.forEach(plane => {
      console.log(`Plane icao24: ${plane.icao24}, Plane CallSign:  Distance from Threat: ${calculateDistance(latitude, longitude, plane.latitude, plane.longitude)}`)
    });
    console.log('')

    // Calculate the distance between the UAV threat location and the closest plane location (using calculate distance function):
    const distanceToPlane = calculateDistance(latitude, longitude, closestPlane.latitude, closestPlane.longitude);
    console.log(`Distance between UAV threat and Closest friendly plane: ${distanceToPlane} kilometers`)
    console.log('')

    // Using T = D / V formula to estimate the time it would take for the threat to reach the plane location (T = Time, D = Distance, V = velocity)
    const estimatedTime = distanceToPlane / speed;
    console.log(`Estimated time of closing: ${estimatedTime}`)
    // Calculate the closing time by adding the estimated time to the current time
    const closingTime = new Date(Date.now() + estimatedTime * 1000); // Multiply by 1000 to convert seconds to milliseconds


    console.log(`Closing time: ${closingTime}`);
    console.log('')
    console.log(`Closest plane: ${JSON.stringify(closestPlane)}`);

    // Send the response back to the frontend
    res.status(200).json({ closestPlane, closingTime });
  } catch (error) {
    console.error('Error handling UAV threat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Function to calculate distance between two coordinates (Haversine formula)
//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = router;
