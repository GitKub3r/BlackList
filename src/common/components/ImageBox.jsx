import "../../styles/components/Image-box.css";

export const ImageBox = ({
  image,
  alt,
  title,
  subtitle,
  description,
  reversed,
}) => {
  return (
    <div className={`image-box` + (reversed ? " reversed" : "")}>
      <div className="text-section">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>

      <img src={`assets/images/${image}`} alt={alt} />
    </div>
  );
};
