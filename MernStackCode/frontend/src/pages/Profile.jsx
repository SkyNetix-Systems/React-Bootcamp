import { BlogCard } from "../components/BlogCard";
import { useState, useEffect } from "react";
import { getPosts } from "../api";

export function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUserData() {
      try {
        const userStr = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("token");

        if (!userStr || !token) {
          console.error("User not logged in");
          return;
        }

        const loggedInUser = JSON.parse(userStr);
        setUser(loggedInUser);

        const allPosts = await getPosts();

        const filteredPosts = allPosts.filter(
          (post) => String(post.author) === String(loggedInUser._id),
        );

        setPosts(filteredPosts);
      } catch (err) {
        console.error("PROFILE LOAD ERROR:", err);
      }
    }

    loadUserData();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-3xl font-bold mb-2">Profile 👤</h2>

      <p className="mb-2">
        <b>Name:</b> {user.name}
      </p>
      <p className="mb-2">
        <b>Email:</b> {user.email}
      </p>
      <p className="mb-6">
        <b>Join Date:</b> {new Date(user.joinDate).toLocaleDateString()}
      </p>

      <h3 className="text-2xl font-semibold mb-4">My Posts ✍️</h3>

      <div className="grid gap-4">
        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}

        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
