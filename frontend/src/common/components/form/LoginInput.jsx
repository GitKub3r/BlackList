import { useState } from "react";

export const LoginInput = ({
    label,
    type,
    name,
    id,
    focus = false,
    value = "",
    handleChange = () => {},
}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        handleChange(e.target.value); // Trigger the provided onChange function
    };

    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                value={inputValue}
                onChange={handleInputChange}
                {...(focus && { autoFocus: true })}
            />
        </div>
    );
};
