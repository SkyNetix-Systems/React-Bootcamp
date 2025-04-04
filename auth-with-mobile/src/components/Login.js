import React, { useState } from "react";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User registered successfully!");
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("User logged in successfully!");
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
