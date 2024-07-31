// services/userService.js
import axios from 'axios';

// const API_URL = 'http://192.168.1.22:3000/users'; // שנה אם ה-API שלך פועל בכתובת שונה

// פונקציה לקבלת כל המשתמשים
export const getUsers = async () => {
  try {
    const response = await axios.get(`http://192.168.1.22:3000/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// פונקציה להוספת משתמש חדש
export const addUser = async (user) => {
  try {
    const response = await axios.post(`http://192.168.1.22:3000/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// פונקציה למחיקת משתמש
export const deleteUser = async (id) => {
  try {
    await axios.delete(`http://192.168.1.22:3000/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
