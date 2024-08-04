import axios from 'axios';

const IP = '192.168.33.12';
export const API_URL = `http://${IP}:3000/users`;

/**
 * Fetches the list of users from the API.
 * 
 * @async
 * @function getUsers
 * @returns {Promise<Object[]>} A promise that resolves to an array of user objects.
 * @throws {Error} Throws an error if the request fails.
 */
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Adds a new user to the API.
 * 
 * @async
 * @function addUser
 * @param {Object} user - The user object to be added.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.phoneNumber - The phone number of the user.
 * @param {string} user.role - The role of the user.
 * @returns {Promise<Object>} A promise that resolves to the added user object.
 * @throws {Error} Throws an error if the request fails.
 */
export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

/**
 * Updates an existing user in the API.
 * 
 * @async
 * @function updateUser
 * @param {string} id - The ID of the user to be updated.
 * @param {Object} updatedUser - The updated user object.
 * @param {string} updatedUser.firstName - The updated first name of the user.
 * @param {string} updatedUser.lastName - The updated last name of the user.
 * @param {string} updatedUser.email - The updated email of the user.
 * @param {string} updatedUser.phoneNumber - The updated phone number of the user.
 * @param {string} updatedUser.role - The updated role of the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 * @throws {Error} Throws an error if the request fails.
 */
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Deletes a user from the API.
 * 
 * @async
 * @function deleteUser
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<void>} A promise that resolves when the user has been deleted.
 * @throws {Error} Throws an error if the request fails.
 */
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
