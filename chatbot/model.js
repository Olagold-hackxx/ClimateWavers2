const jsonData = require('./data.json'); // Adjust the file path accordingly

function getUserLastLocations() {
  const users = jsonData.filter((entry) => entry.model === 'climate_wavers.user');

  if (users.length === 0) {
    throw new Error('No users found in the "climate_wavers.user" model');
  }

  const userLastLocations = {};
  
  users.forEach((user) => {
    userLastLocations[user.pk] = user.fields.last_location;
  });

  return userLastLocations;
}

// Example usage:
try {
  const lastLocations = getUserLastLocations();
  console.log(lastLocations);
} catch (error) {
  console.error(error.message);
}
