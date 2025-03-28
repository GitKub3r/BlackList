export const LoginInput = ({ label, type, name, id }) => {
  const handleChange = (e) => {
    const input = e.target;
    const label = input.previousSibling;

    input.classList.remove("error");
    input.placeholder = "";

    label.classList.remove("error");
  };
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input type={type} name={name} id={id} onChange={handleChange} />
    </div>
  );
};
