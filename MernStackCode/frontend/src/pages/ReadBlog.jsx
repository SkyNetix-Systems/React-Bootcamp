// API function to fetch a single blog post by ID
import { getPost } from "../api";

// React Router hooks for reading route params and navigation
import { useParams, useNavigate } from "react-router-dom";

// React hooks for state and lifecycle handling
import { useState, useEffect } from "react";

// Reusable Button component
import { Button } from "@/components/ui/button";

export function ReadBlog() {
  // State to store the fetched blog post
  const [post, setPost] = useState({});

  // Extract dynamic route parameter (:id)
  let params = useParams();
  let id = params.id;

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Fetch blog post when component mounts
  useEffect(() => {
    // Async function to load post details
    async function loadPost() {
      // Fetch post data from backend using ID
      let data = await getPost(id);

      // Convert ISO date into readable format
      let date = new Date(data.dateCreated);
      data.dateCreated = date.toString();

      // Store post data in state
      setPost(data);
    }

    // Invoke async loader
    loadPost();
  }, []); // Empty dependency array → run once

  return (
    // Main content container
    <div className="flex flex-col items-center w-1/3">
      {/* Back button navigates to previous page */}
      <Button onClick={() => navigate(-1)} className="w-48 my-4">
        Back
      </Button>

      {/* Blog title */}
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
        {post.title}
      </h1>

      {/* Blog short description */}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        {post.description}
      </h2>

      {/* Blog header image */}
      <div className="flex w-full justify-center">
        <img src={post.image?.data} className="max-h-96 my-4" />
      </div>

      {/* Blog creation date (formatted) */}
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {post.dateCreated?.slice(4, 15)}
      </h3>

      {/* Blog content (preserves line breaks) */}
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        {post.content}
      </p>
    </div>
  );
}
