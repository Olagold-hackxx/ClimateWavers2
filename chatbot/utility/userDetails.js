/*
const axios = require('axios');

async function getUserById(userId) {
  const apiUrl = `https://external-api-url.com/users/${userId}`; // Update the URL to the endpoint that retrieves a user by ID

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user details from the external API');
  }
}

module.exports = { getUserById };
*/
// Import your JSON data as needed
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
