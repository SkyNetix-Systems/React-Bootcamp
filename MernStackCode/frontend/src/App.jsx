// Import global CSS for the App component
import "./App.css";

// Import routing utilities from react-router-dom
// HashRouter is used instead of BrowserRouter (useful for GitHub Pages / static hosting)
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import page-level components
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { CreateBlog } from "./pages/CreateBlog";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { ReadBlog } from "./pages/ReadBlog";

// Import reusable UI components
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";

// React hook for handling side effects
import { useEffect } from "react";

// Axios for HTTP requests
import axios from "axios";

function App() {
  // Runs once when the App component mounts
  useEffect(() => {
    // Fetch JWT token (or user token) from sessionStorage
    let token = sessionStorage.getItem("token"); // ✅ correct key
    // If token exists, attach it to axios default headers
    // This ensures Authorization header is sent with every API request
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []); // Empty dependency array → runs only once

  return (
    // Router wraps the entire app to enable routing
    <Router>
      {/* Routes container */}
      <Routes>
        {/* Public landing page route */}
        <Route path="/" element={<Landing />} />

        {/* Layout route for protected/shared pages */}
        {/* Layout typically contains Navbar, Footer, etc. */}
        <Route element={<Layout />}>
          {/* Home page */}
          <Route path="/home" element={<Home />} />

          {/* Page to create a new blog */}
          <Route path="/createblog" element={<CreateBlog />} />

          {/* Dynamic route to read a blog using blog ID */}
          <Route path="/readblog/:id" element={<ReadBlog />} />

          {/* User profile page */}
          <Route path="/profile" element={<Profile />} />

          {/* About page */}
          <Route path="/about" element={<About />} />

          {/* Contact page */}
          <Route path="/contact" element={<Contact />} />
        </Route>
        {/* 👇 fallback so navigation never silently fails */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Export App component as default
export default App;
