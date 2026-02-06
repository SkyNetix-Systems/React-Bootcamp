// Import Create User (Sign-Up) component
import { CreateUser } from "../components/CreateUser";

// Import Login component
import { Login } from "../components/Login";

// React hook for local component state
import { useState } from "react";

// Reusable Button component (probably from shadcn/ui)
import { Button } from "@/components/ui/button";

export function Landing() {
  // view state controls which screen is visible
  // view === 0 → Login screen
  // view === 1 → Create Account screen
  const [view, setView] = useState(0);

  return (
    // Full-screen container, centers content horizontally & vertically
    <div className="flex justify-center items-center w-screen h-screen">
      {/* Conditional rendering based on view state */}
      {!view ? (
        // LOGIN VIEW
        <div className="flex flex-col w-96">
          {/* Login form */}
          <Login />

          {/* Switch to Create Account view */}
          <Button onClick={() => setView(!view)}>Create new Account</Button>
        </div>
      ) : (
        // CREATE ACCOUNT VIEW
        <div className="flex flex-col w-96">
          {/* Create User (Sign-Up) form */}
          <CreateUser />

          {/* Switch back to Login view */}
          <Button onClick={() => setView(!view)}>Login existing account</Button>
        </div>
      )}
    </div>
  );
}
