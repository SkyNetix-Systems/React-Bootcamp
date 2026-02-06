// API function to fetch all blog posts
import { getPosts } from "../api";

// React hooks for state and lifecycle handling
import { useState, useEffect } from "react";

// Component used to display a single blog preview/card
import { BlogCard } from "../components/BlogCard";

export function Home() {
  // State to store all blog posts
  const [posts, setPosts] = useState([]);

  // Runs once when the component mounts
  useEffect(() => {
    // Async function to load all posts from backend
    async function loadAllPosts() {
      // Fetch posts from API
      const data = await getPosts();

      // Sort posts by newest first (descending order by dateCreated)
      data.sort(
        (d1, d2) =>
          new Date(d2.dateCreated).getTime() -
          new Date(d1.dateCreated).getTime(),
      );

      // Update state with sorted posts
      setPosts(data);
    }

    // Invoke the async function
    loadAllPosts();
  }, []); // Empty dependency array → runs only once

  return (
    // Page wrapper centered horizontally
    <div className="flex flex-col items-center w-full">
      {/* Content container with fixed width */}
      <div className="w-1/3 mt-4">
        {/* Render a BlogCard for each post */}
        {posts.map((post) => {
          return <BlogCard post={post} />;
        })}
      </div>
    </div>
  );
}
