import "../../styles/components/Custom-Select.css";

import React, { useState } from "react";

export const CustomSelect = ({
    label = "Custom Select",
    options = [],
    onChange,
    value = "Hoster",
}) => {
    const [selectedOption, setSelectedOption] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) onChange(option);
    };

    return (
        <div className="custom-select-container">
            <label>{label}</label>
            <div
                className={`custom-select ${isOpen && "custom-select-open"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="selected-option">
                    {selectedOption || "Select an option"}
                    <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                </div>
                {isOpen && (
                    <div className="options">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="option"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
