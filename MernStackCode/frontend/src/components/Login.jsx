import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await verifyUser(user);

      if (res?.token) {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("user", JSON.stringify(res.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
        navigate("/home");
      } else {
        setError("Invalid email or password 😬");
      }
    } catch (err) {
      setError("Login failed. Check credentials or server 🔥");
      console.error("LOGIN ERROR:", err.response?.status || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 340,
          padding: 24,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Login</h2>

        {error && (
          <div
            style={{
              background: "#ffe4e6",
              color: "#b91c1c",
              padding: "8px 10px",
              borderRadius: 6,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            width: "100%",
            marginTop: 10,
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #2563eb",
            background: "#fff",
            color: "#2563eb",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Create new Account
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 14,
  color: "#111827",
  background: "#fff",
  outline: "none",
};
