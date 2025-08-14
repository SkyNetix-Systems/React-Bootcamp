// services/hotel.js
import axios from "axios";

export const createHotel = async (hotelData, token) => {
    const formData = new FormData();

    if (Array.isArray(hotelData)) {
        // If it's already array of [key, value]
        hotelData.forEach(([key, value]) => {
            if (value !== undefined && value !== null && !(typeof value === "string" && value.trim() === "")) {
                formData.append(key, value);
            }
        });
    } else {
        // If it's a plain object
        Object.entries(hotelData || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null && !(typeof value === "string" && value.trim() === "")) {
                formData.append(key, value);
            }
        });
    }

    // Debug to confirm payload
    console.log("Sending FormData:");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    return await axios.post(
        `${process.env.REACT_APP_API}/create-hotel`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                // Let Axios set Content-Type automatically for FormData
            },
        }
    );
};
