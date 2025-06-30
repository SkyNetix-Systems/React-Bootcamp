"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { app } from "./firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

type MessageType = "success" | "error" | null;

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const resetMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 5000);
  };

  const handleAuthError = (error: any) => {
    const errorMap: Record<string, string> = {
      "auth/user-not-found": "User not found.",
      "auth/wrong-password": "Incorrect password.",
      "auth/email-already-in-use": "Email already in use.",
      "auth/invalid-email": "Invalid email format.",
      "auth/unauthorized-domain":
        "This domain is not authorized for authentication.",
      "auth/invalid-credential":
        "Invalid credentials. Please check your login details.",
      "auth/too-many-requests": "Too many attempts. Try again later.",
    };

    const msg =
      errorMap[error.code] || error.message || "Something went wrong.";
    setMessage(msg);
    setMessageType("error");
    resetMessage();
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
      }
      setMessageType("success");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setMessage("Google login successful!");
      setMessageType("success");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      setMessage("Facebook login successful!");
      setMessageType("success");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage("Logged out successfully!");
      setMessageType("success");
    } catch (error) {
      handleAuthError(error);
    }
  };

  return (
    <div style={styles.container}>
      {isAuthenticated ? (
        <>
          <h2>Welcome, you are logged in!</h2>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : (
        <div style={styles.authContainer}>
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            style={styles.toggleButton}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>

          <form onSubmit={handleFormSubmit} style={styles.form}>
            <h2 style={styles.title}>{isSignup ? "Sign Up" : "Login"}</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.submitButton}>
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div style={styles.socialButtonsContainer}>
            <button onClick={handleGoogleSignIn} style={styles.googleButton}>
              Sign in with Google
            </button>
            <button
              onClick={handleFacebookSignIn}
              style={styles.facebookButton}
            >
              Sign in with Facebook
            </button>
          </div>
        </div>
      )}

      {message && (
        <div
          style={{
            ...styles.message,
            ...(messageType === "error" ? styles.error : styles.success),
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  authContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  toggleButton: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    padding: "0.7rem 1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    fontSize: "1.5rem",
  },
  input: {
    padding: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  submitButton: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    padding: "0.7rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  socialButtonsContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  googleButton: {
    backgroundColor: "#db4437",
    color: "white",
    border: "none",
    flex: 1,
    padding: "0.7rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    color: "white",
    border: "none",
    flex: 1,
    padding: "0.7rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "0.8rem 1.2rem",
    borderRadius: "5px",
    marginTop: "1rem",
    cursor: "pointer",
  },
  message: {
    marginTop: "1.5rem",
    padding: "1rem",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  success: {
    backgroundColor: "#28a745",
    color: "white",
  },
  error: {
    backgroundColor: "#dc3545",
    color: "white",
  },
};
