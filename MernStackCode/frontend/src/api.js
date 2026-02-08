import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // ✅ no /api
});

export const getPosts = async () => {
  const res = await API.get("/posts"); // ✅ works
  return res.data;
};

export const createPost = async (formData) => {
  const res = await API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
