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

    const users = jsonData.filter((entry) => entry.model === 'climate_wavers.user');

    if (users.length === 0) {
      throw new Error('No users found in the "climate_wavers.user" model');
    }
  
    return users.map((user) => ({ pk: user.pk, ...user.fields }));

    
  }
  

module.exports = { getAllUsers };
