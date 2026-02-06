import axios from "axios";

// Base URL for backend API
const URL = "http://localhost:3000";

//
// -------------------- POSTS API --------------------
//

// Fetch all blog posts
export async function getPosts() {
  try {
    const res = await axios.get(`${URL}/posts`);
    return res.data; // ✅ always return data
  } catch (err) {
    console.error("GET POSTS ERROR:", err.response?.status);
    return [];
  }
}

// Fetch a single blog post by ID
export async function getPost(id) {
  try {
    const res = await axios.get(`${URL}/posts/${id}`);
    const post = res.data;

    if (post.imageId) {
      const image = await getImage(post.imageId);
      post.image = image;
    }

    return post;
  } catch (err) {
    console.error("GET POST ERROR:", err.response?.status);
    throw err;
  }
}

// Create a new blog post
export async function createPost(post) {
  try {
    // ⛔ never mutate incoming object
    const payload = { ...post };

    // Upload image first
    if (payload.file) {
      const imageRes = await createImage(payload.file);
      payload.imageId = imageRes.imageId;
    }

    delete payload.file; // backend should not receive File object

    const res = await axios.post(`${URL}/posts`, payload);
    return res.data;
  } catch (err) {
    console.error("CREATE POST ERROR:", err.response?.data);
    throw err;
  }
}

// Update an existing blog post
export async function updatePost(id, post) {
  try {
    const res = await axios.put(`${URL}/posts/${id}`, post);
    return res.data;
  } catch (err) {
    console.error("UPDATE POST ERROR:", err.response?.data);
    throw err;
  }
}

// Delete a blog post by ID
export async function deletePost(id) {
  try {
    const res = await axios.delete(`${URL}/posts/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE POST ERROR:", err.response?.data);
    throw err;
  }
}

//
// -------------------- USERS API --------------------
//

// Fetch a user by ID
export async function getUser(id) {
  try {
    const res = await axios.get(`${URL}/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("GET USER ERROR:", err.response?.status);
    return null;
  }
}

// Create a new user (Sign Up)
export async function createUser(user) {
  try {
    const res = await axios.post(`${URL}/users`, user);
    return res.data;
  } catch (err) {
    console.error("CREATE USER ERROR:", err.response?.data);
    throw err;
  }
}

// Update an existing user
export async function updateUser(id, user) {
  try {
    const res = await axios.put(`${URL}/users/${id}`, user);
    return res.data;
  } catch (err) {
    console.error("UPDATE USER ERROR:", err.response?.data);
    throw err;
  }
}

// Verify user credentials and return JWT token
export async function verifyUser(user) {
  try {
    const res = await axios.post(`${URL}/users/login`, user);
    return res.data.success ? res.data.token : null;
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data);
    return null;
  }
}

//
// -------------------- IMAGES API --------------------
//

// Upload an image file
export async function createImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  // ✅ DO NOT set Content-Type manually
  const res = await axios.post(`${URL}/images`, formData);
  return res.data;
}

// Fetch image data by image ID
export async function getImage(id) {
  try {
    const res = await axios.get(`${URL}/images/${id}`);
    return res.data; // ✅ return actual image string
  } catch (err) {
    console.error("GET IMAGE ERROR:", err.response?.status);
    return null;
  }
}
