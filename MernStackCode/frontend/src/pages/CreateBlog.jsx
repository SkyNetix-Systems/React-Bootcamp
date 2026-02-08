import { createPost } from "../api";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("image", imageFile); // MUST be file object

    await createPost(formData);

    alert("Blog created successfully ✅");
    navigate("/home");
  } catch (err) {
    console.error("CREATE POST ERROR:", err.response?.data || err.message);
    alert("Failed to create blog ❌");
  }
};
