import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createHotel } from "../actions/hotel";
import HotelForm from "../components/forms/HotelForm";

const NewHotel = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { token, user } = auth || {};

    const initialValues = {
        title: "",
        content: "",
        location: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: "",
    };

    const [values, setValues] = useState(initialValues);
    const [preview, setPreview] = useState("/images/default-hotel.png"); // default image

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Date validation
        if (values.from && values.to && new Date(values.to) < new Date(values.from)) {
            toast.error("To date cannot be earlier than From date");
            return;
        }

        try {
            const formData = new FormData();
            for (let key in values) {
                if (values[key]) {
                    if (key === "image") {
                        formData.append("image", values.image);
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            }

            console.log("📤 Submitting hotel data:");
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const res = await createHotel(formData, token);
            console.log(res.data);
            toast.success("New Hotel posted!");

            // Reset form and preview
            setValues(initialValues);
            setPreview("/images/default-hotel.png");

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || "Hotel creation failed");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValues({ ...values, image: file });
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleBedChange = (value) => {
        setValues({ ...values, bed: value });
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>Add Hotel</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <HotelForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={handleSubmit}
                            handleImageChange={handleImageChange}
                            handleChange={handleChange}
                            handleBedChange={handleBedChange}
                        />
                    </div>
                    <div className="col-md-2">
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="img img-fluid m-2"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewHotel;
