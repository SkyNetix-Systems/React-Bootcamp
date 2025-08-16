import axios from "axios";

export const createHotel = async (formData, token) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-hotel`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                // ❌ don't set Content-Type manually
            },
        }
    );
};
