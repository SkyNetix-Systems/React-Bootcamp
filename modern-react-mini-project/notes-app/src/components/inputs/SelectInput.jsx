import React from 'react'

const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block font-semibold">
                {label}
            </label>
            <select
                name={name}
                className="w-full p-2 border rounded-lg"
                value={value}
                onChange={onChange}
                required
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput
