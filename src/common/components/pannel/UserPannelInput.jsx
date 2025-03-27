export const UserPannelInput = ({ label, type, name, id, value = "" }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input type={type} name={name} id={id} defaultValue={value} />
    </div>
  );
};
