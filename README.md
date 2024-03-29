UAV Threat Detector
The project allows decision makers to input coordinates for a potential UAV threat, along with its speed and maximum radius.
The backend system then computes and finds nearby (potential) friendly aircrafts within the specified threat radius.
If any aircrafts are detected, the system would sort them from the closest to the farthest, and would respond with the closest aircraft's details.
After entering and reviewing potential friendly aircraft's details nearby, decision makers may save details using the SAVE button (icon) appearing under the threat details. Upon attempting to save a message will appear below the button if saving was successful or not.
Located on the top right cornter is a database button, press it in order to view previously saved details.

HOW TO USE:
Pre-requirements for the project:
  - Docker

Download the project, or clone the project using the git clone command.
Either open the project in an IDE and open the terminal, or navigate to the project root directory.

To run the project type in the terminal/cmd:
  - docker-compose up --build

(Wait for it to build),

Then type: 
  - docker-compose exec backend npx prisma migrate dev

The project should be running now. You can access the project in your web browser by typing in:
  http://localhost:3000

  
