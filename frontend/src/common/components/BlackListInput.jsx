export const BlackListInput = ({ label, type, name, id, required = false }) => {
  const handleChange = (e) => {
    const input = e.target;
    const label = input.previousSibling;

    input.classList.remove("error");
    input.placeholder = "";

    label.classList.remove("error");
  };
  return (
    <div className="input-container">
      <label htmlFor={id}>
        {label}
        {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
      </label>

      <input type={type} name={name} id={id} onChange={handleChange} />
    </div>
  );
};
