import axios from 'axios';

// 1. Make the API_URL relative so it uses the proxy
const API_URL = '/api/plants';

// 2. Helper function to get the auth token and create headers
const getAuthHeaders = () => {
  // Get the token from wherever you store it (localStorage, sessionStorage)
  const token = localStorage.getItem('token'); 

  if (token) {
    return { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    };
  } else {
    // Return default headers if no token (for public routes, if any)
    return { 'Content-Type': 'application/json' };
  }
};

/**
 * Gets all plants for the logged-in user.
 */
export const getPlants = async () => {
  try {
    const config = { headers: getAuthHeaders() };
    const res = await axios.get(API_URL, config); // Uses proxy + auth
    return res.data;
  } catch (err) {
    console.error('Error fetching plants:', err.response?.data || err.message);
    throw err; // Throw error for the component to handle
  }
};

/**
 * Adds a new plant.
 * @param {object} plantData - The data for the new plant
 */
export const addPlant = async (plantData) => {
  try {
    const config = { headers: getAuthHeaders() };
    // We send the data (plantData) as the second argument, config as the third
    const response = await axios.post(API_URL, plantData, config); // Uses proxy + auth
    return response.data; 
  } catch (error) {
    console.error("Error details from plantService:", error.response?.data || error.message);
    throw error; 
  }
};

/**
 * Deletes a plant by its ID.
 * @param {string} id - The ID of the plant to delete
 */
export const deletePlant = async (id) => {
  try {
    const config = { headers: getAuthHeaders() };
    await axios.delete(`${API_URL}/${id}`, config); // Uses proxy + auth
    return true;
  } catch (err) {
    console.error('Error deleting plant:', err.response?.data || err.message);
    throw err;
  }
};

/**
 * Gets a single plant by its ID.
 * @param {string} id - The ID of the plant to fetch
 */
export const getPlantById = async (id) => {
  try {
    const config = { headers: getAuthHeaders() };
    const res = await axios.get(`${API_URL}/${id}`, config); // Uses proxy + auth
    return res.data;
  } catch (err) {
    console.error('Error fetching plant by ID:', err.response?.data || err.message);
    throw err;
  }
};

/**
 * Updates an existing plant.
 * @param {string} id - The ID of the plant to update
 * @param {object} updatedData - The new data for the plant
 */
export const updatePlant = async (id, updatedData) => {
  try {
    const config = { headers: getAuthHeaders() };
    // For PUT/POST, data is the 2nd arg, config is the 3rd
    const res = await axios.put(`${API_URL}/${id}`, updatedData, config); // Uses proxy + auth
    return res.data;
  } catch (err) {
    console.error('Error updating plant:', err.response?.data || err.message);
    throw err;
  }
};