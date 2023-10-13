const axios = require('axios');

async function getUserLocation(userInput) {
  const apiKey = 'your-geolocation-api-key'; // Replace with your API key
  const apiUrl = 'https://geolocation-service-api.com/endpoint'; // Replace with the actual API URL

  try {
    const response = await axios.get(apiUrl, {
      params: {
        input: userInput, // Provide user data for location lookup
        key: apiKey, // Include your API key if required
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user location');
  }
}

module.exports = getUserLocation;
