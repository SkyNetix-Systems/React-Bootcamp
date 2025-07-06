import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    // useSelector must be used inside the component
    const state = useSelector((state) => state);

    return (
        <div className="container-fluid h1 p-5 text-center">
            Home Page
        </div>
    );
}

export default Home;
