import axios from "axios";

// Create hotel
export const createHotel = async (formData, token) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-hotel`, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Get all hotels
export const allHotels = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/hotels`);
};

// Get hotel image URL
export const hotelImage = (hotel) => {
    if (hotel?._id) return `${process.env.REACT_APP_API}/hotel-image/${hotel._id}`;
    return "/images/default-hotel.png";
};
