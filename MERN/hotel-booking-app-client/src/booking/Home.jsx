import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    // useSelector must be used inside the component
    const { name, email, token } = useSelector((state) => ({
        name: state.auth.user?.name,
        email: state.auth.user?.email,
        token: state.auth.token
    }));

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Token:", token);

    return (
        <div className="container-fluid h1 p-5 text-center">
            Home Page
        </div>
    );
}

export default Home;
