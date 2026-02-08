import { Link } from "react-router-dom";

export function BlogCard({ post }) {
  const date = new Date(post.dateCreated).toDateString();

  return (
    <div className="border rounded-lg p-4 my-4 hover:bg-muted transition w-80">
      <Link to={`/readblog/${post._id}`} className="block space-y-2">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-muted-foreground">{post.description}</p>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-64 object-cover rounded-lg"
            loading="lazy"
            onError={(e) => {
              console.error("❌ Image failed:", post.imageUrl);
              e.target.style.display = "none";
            }}
          />
        )}

        <p className="text-sm text-gray-500">{date}</p>
      </Link>
    </div>
  );
}
