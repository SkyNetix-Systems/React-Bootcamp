import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { BlogCard } from "../components/BlogCard";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        console.log("POSTS FROM API 👉", data); // debug
        setPosts(data);
      })
      .catch((err) => console.error("GET POSTS ERROR ❌", err));
  }, []);

  return (
    <div className="flex flex-col items-center">
      {posts.map((p) => (
        <BlogCard key={p._id} post={p} />
      ))}
    </div>
  );
}
