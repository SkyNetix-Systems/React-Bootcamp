import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
    const navigate = useNavigate(); // ✅ useNavigate hook for redirects

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 Submitting registration data");
        console.table([{ name, email, password }]);

        try {
            const res = await register({
                name,
                email,
                password
            });

            console.log("✅ REGISTER USER =>", res.data);
            toast.success("Registration successful. Please Login");
            navigate("/login"); // ✅ navigate instead of history.push

            // reset form only on success
            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {
            console.error("❌ Registration Error: ", error);
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error || "Registration failed");
            } else {
                toast.error("Server error. Try again later.");
            }
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondaery p-5 text-center">
                <h1>Register</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <RegisterForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
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

export default Register;
