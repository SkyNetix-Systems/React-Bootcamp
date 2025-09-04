import React from "react";
import { DatePicker, Select, message } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const HotelForm = ({
    values,
    handleSubmit,
    handleImageChange,
    handleChange,
    handleBedChange
}) => {
    const { title, content, location, price, from, to, bed } = values;

    return (
        <form onSubmit={handleSubmit}>
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
                onChange={(date) =>
                    handleChange({
                        target: { name: "from", value: date ? date.format("YYYY-MM-DD") : "" }
                    })
                }
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
                    handleChange({
                        target: { name: "to", value: date ? date.format("YYYY-MM-DD") : "" }
                    });
                }}
                disabledDate={(current) =>
                    (from && current < dayjs(from).startOf("day")) || current < dayjs().startOf("day")
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
};

export default HotelForm;
