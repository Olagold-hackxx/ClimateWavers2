/*
async function getAllUsers() {
  const apiUrl = 'https://external-api-url.com/users';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch all user details from the external API');
    }

    const allUsers = await response.json();
    
    
    const transformedUsers = allUsers.map((user) => ({
      id: user.id,
      last_location: user.last_location,
      // Add more properties if needed
    }));

    return transformedUsers;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch all user details from the external API');
  }
}

module.exports = { getAllUsers };

*/
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
