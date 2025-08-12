import { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 Submitting registration data:", { name, email, password });

        try {
            const res = await register({ name, email, password });

            // ✅ Check if res & res.data exist
            if (res?.data) {
                console.log("✅ REGISTER USER =>", res.data);
                toast.success("Registration successful! Please log in.");
                navigate("/login");

                // Reset form fields only if successful
                setName("");
                setEmail("");
                setPassword("");
            } else {
                throw new Error("No response data received from server.");
            }
        } catch (error) {
            console.error("❌ Registration Error: ", error);

            if (error.response?.status === 400) {
                toast.error(error.response.data?.error || "Registration failed.");
            } else {
                toast.error("Server error. Please try again later.");
            }
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center text-white">
                <h1>Create Your Account</h1>
            </div>

            <div className="container my-5">
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
