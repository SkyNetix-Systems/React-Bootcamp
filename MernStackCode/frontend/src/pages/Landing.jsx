// Import Create User (Sign-Up) component
import { CreateUser } from "../components/CreateUser";

// Import Login component
import { Login } from "../components/Login";

// React hook for local component state
import { useState } from "react";

export function Landing() {
  // view === 0 → Login
  // view === 1 → Create Account
  const [view, setView] = useState(0);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {!view ? (
        // LOGIN VIEW
        <div className="flex flex-col w-96">
          <Login />
          {/* ❌ Removed duplicate Create Account button */}
        </div>
      ) : (
        // CREATE ACCOUNT VIEW
        <div className="flex flex-col w-96">
          <CreateUser />
          {/* ❌ Removed duplicate Login button */}
        </div>
      )}
    </div>
  );
}
