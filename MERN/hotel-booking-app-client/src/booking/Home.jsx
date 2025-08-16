import React, { useEffect, useState } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const Home = () => {
    const [hotels, setHotels] = useState([]);

    const loadAllHotels = async () => {
        try {
            const { data } = await allHotels();
            setHotels(data);
        } catch (err) {
            console.log("Error loading hotels:", err);
        }
    };

    useEffect(() => {
        loadAllHotels();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Hotels</h1>
            {hotels.length ? (
                hotels.map((h) => <SmallCard key={h._id} h={h} />)
            ) : (
                <p>No Hotels Found</p>
            )}
        </div>
    );
};

export default Home;
