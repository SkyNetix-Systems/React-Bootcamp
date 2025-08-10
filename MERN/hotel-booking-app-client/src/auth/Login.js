import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🔥 Logging in with:", email, password);

        try {
            const res = await login({ email, password });
            console.log("✅ LOGIN SUCCESS =>", res.data);

            toast.success("Login successful!");
            // Redirect user after login
            navigate("/");
        } catch (err) {
            console.error("❌ Login error:", err);
            toast.error(err.response?.data?.error || "Login failed. Try again.");
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Login</h1>
            </div>
            <div className="container">
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
