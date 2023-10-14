// Instead of using an external API, we're importing JSON data locally
const jsonData = require('../data.json'); // Adjust the file path accordingly

function getAllUsers() {
  if (!jsonData || !Array.isArray(jsonData)) {
    throw new Error('Invalid JSON data or data format');
  }

  const allUsers = jsonData.map((user) => ({
    id: user.id,
    last_location: user.last_location,
  }));
  return allUsers;
}

module.exports = { getAllUsers };

