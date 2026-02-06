// API function to verify user credentials and return JWT
import { verifyUser } from "../api";

// React hook for managing form state
import { useState } from "react";

// Hook to programmatically navigate after login
import { useNavigate } from "react-router-dom";

// Axios for setting global Authorization header
import axios from "axios";

// Reusable UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  // State to store login form values
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Navigation hook
  const navigate = useNavigate();

  // Updates form state dynamically based on input name
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  // Handles form submission
  async function handleSubmit(e) {
    // Prevent page reload
    e.preventDefault();

    // Call backend to verify credentials
    let response = await verifyUser(user);

    if (response) {
      // Store JWT token in sessionStorage
      sessionStorage.setItem("User", response);

      // Log token (dev/debug only — remove in production)
      console.log(`Bearer ${response}`);

      // Set default Authorization header for all axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;

      // Redirect user to home page after successful login
      navigate("/home");
    } else {
      // Show error if login fails
      alert("Login failed");
    }
  }

  return (
    // Login form
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Email input */}
      <Input
        placeholder="Email"
        onChange={handleChange}
        name="email"
        required
        maxLength={40}
        className="mb-2"
      />

      {/* Password input */}
      <Input
        placeholder="Password"
        onChange={handleChange}
        name="password"
        type="password"
        required
        maxLength={20}
        className="mb-2"
      />

      {/* Submit button */}
      <Button type="submit" className="mb-4">
        Login
      </Button>
    </form>
  );
}
