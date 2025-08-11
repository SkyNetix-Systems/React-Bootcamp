// api.js
import axios from "axios";

// Ensure your .env file has: REACT_APP_API=http://localhost:8000/api
const API_BASE = process.env.REACT_APP_API;

if (!API_BASE) {
  console.error("❌ REACT_APP_API is not set in your environment variables.");
}

export const register = async ({ name, email, password }) => {
  try {
    const res = await axios.post(`${API_BASE}/register`, { name, email, password });
    console.log("✅ Registration successful:", res.data);
    return res;
  } catch (err) {
    console.error(
      "❌ Registration Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${API_BASE}/login`, user);
    console.log("✅ Login successful:", data);
    return data; // return only the useful payload
  } catch (err) {
    console.error("❌ Login Error:", err.response?.data || err.message);
    throw err.response?.data || err; // throw clean error
  }
};

