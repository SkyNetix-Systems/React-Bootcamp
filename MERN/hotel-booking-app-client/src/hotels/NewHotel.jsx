import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DatePicker, message, Select } from "antd";
import dayjs from "dayjs";
import { createHotel } from "../actions/hotel";

const { Option } = Select;

const NewHotel = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { token, user } = auth || {};

    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: "",
    });

    const [preview, setPreview] = useState("");

    const { title, content, location, price, from, to, bed } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Date validation
        if (from && to && dayjs(to).isBefore(dayjs(from), "day")) {
            message.error("To date cannot be earlier than From date");
            return;
        }

        const formData = new FormData();
        Object.entries({
            ...values,
            postedBy: user?.id || user?._id || "",
        }).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "") {
                formData.append(key, val);
            }
        });

        console.log("Submitting hotel data:", [...formData]);

        try {
            const res = await createHotel(formData, token);
            console.log(res.data);
            toast.success("New Hotel posted!");
            setTimeout(() => window.location.reload(), 1000);
        } catch (err) {
            console.error(err);
            toast.error("Hotel creation failed");
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

    const hotelForm = () => (
        <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                    Image
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        hidden
                    />
                </label>
            </div>

            <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control m-2"
                value={title}
                onChange={handleChange}
            />

            <textarea
                name="content"
                placeholder="Content"
                className="form-control m-2"
                value={content}
                onChange={handleChange}
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                className="form-control m-2"
                value={location}
                onChange={handleChange}
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control m-2"
                value={price}
                onChange={handleChange}
            />

            <DatePicker
                style={{ width: "100%" }}
                className="m-2"
                placeholder="From"
                value={from ? dayjs(from) : null}
                onChange={(date) => {
                    setValues({
                        ...values,
                        from: date ? date.format("YYYY-MM-DD") : "",
                    });
                    if (to && date && dayjs(to).isBefore(date, "day")) {
                        setValues((prev) => ({ ...prev, to: "" }));
                    }
                }}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
            />

            <DatePicker
                style={{ width: "100%" }}
                className="m-2"
                placeholder="To"
                value={to ? dayjs(to) : null}
                onChange={(date) => {
                    if (from && date && dayjs(date).isBefore(dayjs(from), "day")) {
                        message.error("To date cannot be earlier than From date");
                        return;
                    }
                    setValues({
                        ...values,
                        to: date ? date.format("YYYY-MM-DD") : "",
                    });
                }}
                disabledDate={(current) =>
                    (from && current < dayjs(from).startOf("day")) ||
                    current < dayjs().startOf("day")
                }
            />

            <Select
                placeholder="Number of Beds"
                value={bed || undefined}
                onChange={handleBedChange}
                style={{ width: "100%" }}
                className="m-2"
            >
                <Option value="1">1 bed</Option>
                <Option value="2">2 beds</Option>
                <Option value="3">3 beds</Option>
                <Option value="4">4 beds</Option>
            </Select>

            <button className="btn btn-outline-primary m-2">Save</button>
        </form>
    );

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>Add Hotel</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        {hotelForm()}
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
