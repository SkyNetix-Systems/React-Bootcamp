import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await verifyUser(user);

      if (res?.token && res?.user) {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("user", JSON.stringify(res.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
        navigate("/home", { replace: true });
        return;
      }

      alert("Login failed. Check email/password.");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed. Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Welcome back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <Button type="submit" className="mt-2">
            Login
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/register")}
          >
            Create new account
          </Button>
        </form>
      </div>
    </div>
  );
}
