export const UserPannelInput = ({
  label,
  type,
  name,
  id,
  value = "",
  required = false,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>
        {label}
        {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
      </label>

      <input type={type} name={name} id={id} defaultValue={value} />
    </div>
  );
};
