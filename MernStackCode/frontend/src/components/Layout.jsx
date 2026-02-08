import { Navbar } from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Read the correct key
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    // Allow landing page without token
    if (!token && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [token, location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <main className="flex w-screen justify-center mt-24">
        <Outlet />
      </main>
    </>
  );
}
