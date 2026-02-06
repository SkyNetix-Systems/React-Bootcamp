// Component used to display individual blog posts
import { BlogCard } from "../components/BlogCard";

// React hooks for state and lifecycle
import { useState, useEffect } from "react";

// API function to fetch all blog posts
import { getPosts } from "../api";

// Library to decode JWT token stored on client
import * as jwt_decode from "jwt-decode";

export function Profile() {
  // State to store posts authored by the logged-in user
  const [posts, setPosts] = useState([]);

  // State to store decoded user details from JWT
  const [user, setUser] = useState({});

  // Runs once when Profile component mounts
  useEffect(() => {
    // Load user info and their blog posts
    async function loadUserData() {
      // Retrieve JWT token from sessionStorage
      const token = sessionStorage.getItem("User");

      // Decode token to extract user information (id, email, name, etc.)
      const decodedUser = jwt_decode.jwtDecode(token);

      // Fetch all blog posts from backend
      const allPosts = await getPosts();

      // Filter posts created by the logged-in user
      const filteredPosts = allPosts.filter(
        (post) => post.author == decodedUser._id,
      );

      // Store filtered posts and user details in state
      setPosts(filteredPosts);
      setUser(decodedUser);
    }

    // Invoke async loader
    loadUserData();
  }, []); // Empty dependency array → run once

  return (
    // Profile container
    <div className="w-1/3">
      {/* User name */}
      <label className="flex left-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        Name:
      </label>
      <h2 className="flex left-0 mb-4">{user.name}</h2>

      {/* User email */}
      <label className="flex left-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        Email:
      </label>
      <h2 className="flex left-0 mb-4">{user.email}</h2>

      {/* User join date */}
      <label className="flex left-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        Join Date:
      </label>
      <h2 className="flex left-0 mb-4">{user.joinDate}</h2>

      {/* Render user's blog posts */}
      {posts.map((post) => {
        return <BlogCard post={post} />;
      })}
    </div>
  );
}
