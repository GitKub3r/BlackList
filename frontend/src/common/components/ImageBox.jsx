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
    <div className={`image-box fade-in` + (reversed ? " reversed" : "")}>
      <div className="text-section fade-in">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <img src={`assets/images/${image}`} alt={alt} className="fade-in" />
    </div>
  );
};
