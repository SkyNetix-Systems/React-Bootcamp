import { memo } from "react";
import { useState } from "react";

function createRandomPost() {
  return {
    title: `Random Title ${Math.floor(Math.random() * 10000)}`,
    body: `This is a randomly generated post content with ID: ${Math.floor(Math.random() * 10000)}`,
  };
}

function App({ children }) {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h1>Simple Counter</h1> <p>Count: {count}</p>{" "}
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      {children}
    </section>
  );
}

function Archive({ showArchive, setShowArchive }) {
  // Generating 30 000 posts
  const [posts] = useState(() => Array.from({ length: 30000 }, () => createRandomPost()));

  return (
    <aside>
      <h2>Архив</h2>{" "}
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>
      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}{" "}
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function RootApp() {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <App>
      <Archive setShowArchive={setShowArchive} showArchive={showArchive} />
    </App>
  );
}
export default RootApp;
