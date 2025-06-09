import { useState } from "react";

export const LoginInput = ({
  label,
  type,
  name,
  id,
  focus = false,
  value = "",
  autoComplete = true,
  disabled = false,
  handleChange = () => {},
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleChange(e.target.value); // Trigger the provided onChange function
  };

  return (
    <div className="input-container">
      <label htmlFor={id} className={disabled ? "disabled-label" : ""}>
        {label}
        {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        autoComplete={autoComplete ? "on" : "off"}
        disabled={disabled}
        {...(focus && { autoFocus: true })}
      />
    </div>
  );
};
