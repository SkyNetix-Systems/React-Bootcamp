import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../store";
import { store } from "../store"; // adjust path if store.js is somewhere else


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🔥 Attempting login with:", { email, password });

        try {
            const res = await login({ email, password });
            console.log("✅ LOGIN SUCCESS:", res);

            if (res) {
                console.log("Saving res.data to localStorage and redux");
                // Save to localStorage
                window.localStorage.setItem("auth", JSON.stringify(res.data));

                // Save to redux
                dispatch(loggedInUser(res));
                console.log("Redux after login:", store.getState());

            }

            toast.success("🎉 Login successful!");
            navigate("/dashboard");
        } catch (err) {
            console.error("❌ Login error:", err);
            toast.error(err.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center text-white">
                <h1>Login</h1>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <LoginForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
