// services/userService.js
import axios from 'axios';

const IP = '192.168.1.22';

export const API_URL = `http://${IP}:3000/users`; // שנה אם ה-API שלך פועל בכתובת שונה

// פונקציה לקבלת כל המשתמשים
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// פונקציה להוספת משתמש חדש
export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// פונקציה למחיקת משתמש
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
