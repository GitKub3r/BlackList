import "../../styles/components/Text-box.css";

export const TextBox = ({ title, subtitle, description, reversed }) => {
  return (
    <div className={`text-box fade-in` + (reversed ? " reversed" : "")}>
      <div className="text-section fade-in">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
};
