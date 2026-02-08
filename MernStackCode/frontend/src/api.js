import axios from "axios";

// Base URL for backend API
const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Helper: attach JWT token if available (use sessionStorage for consistency)
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// -------------------- POSTS API --------------------
//

export async function getPosts() {
  try {
    const res = await API.get("/posts");
    return res.data;
  } catch (err) {
    console.error("GET POSTS ERROR:", err?.response?.status || err.message);
    return [];
  }
}

export async function getPost(id) {
  try {
    const res = await API.get(`/posts/${id}`);
    const post = res.data;

    if (post?.imageId) {
      post.imageUrl = `${API.defaults.baseURL}/uploads/${post.imageId}`;
    }

    return post;
  } catch (err) {
    console.error("GET POST ERROR:", err?.response?.status || err.message);
    throw err;
  }
}

export async function createPost(post) {
  try {
    const payload = { ...post };

    if (payload?.file instanceof File) {
      const imageRes = await createImage(payload.file);
      payload.imageId = imageRes.filename;
    }

    delete payload.file;

    const res = await API.post("/posts", payload);
    return res.data;
  } catch (err) {
    console.error("CREATE POST ERROR:", err?.response?.data || err.message);
    throw err;
  }
}

export async function updatePost(id, post) {
  try {
    const res = await API.put(`/posts/${id}`, post);
    return res.data;
  } catch (err) {
    console.error("UPDATE POST ERROR:", err?.response?.data || err.message);
    throw err;
  }
}

export async function deletePost(id) {
  try {
    const res = await API.delete(`/posts/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE POST ERROR:", err?.response?.data || err.message);
    throw err;
  }
}

//
// -------------------- USERS API --------------------
//

export async function getUser(id) {
  try {
    const res = await API.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("GET USER ERROR:", err?.response?.status || err.message);
    return null;
  }
}

export async function createUser(user) {
  try {
    const res = await API.post("/users", user);
    return res.data;
  } catch (err) {
    console.error("CREATE USER ERROR:", err?.response?.data || err.message);
    throw err;
  }
}

export async function updateUser(id, user) {
  try {
    const res = await API.put(`/users/${id}`, user);
    return res.data;
  } catch (err) {
    console.error("UPDATE USER ERROR:", err?.response?.data || err.message);
    throw err;
  }
}

// ✅ FIXED: return token + user object
export async function verifyUser(credentials) {
  try {
    const res = await API.post("/users/login", credentials);

    if (res.data?.success && res.data?.token && res.data?.user) {
      return res.data; // { success, token, user }
    }
    return null;
  } catch (err) {
    console.error("LOGIN ERROR:", err?.response?.data || err.message);
    return null;
  }
}

//
// -------------------- IMAGES API --------------------
//

export async function createImage(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await API.post("/images", formData);
    return res.data; // { filename, size, type, url }
  } catch (err) {
    console.error("CREATE IMAGE ERROR:", err?.response?.data || err.message);
    throw err;
  }
}
