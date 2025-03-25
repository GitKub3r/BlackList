import "../../styles/layouts/Wrap-layout.css";

export const WrapLayout = ({ children, contrast }) => {
  return (
    <div className={`wrap-layout` + (contrast ? " contrast" : "")}>
      {children}
    </div>
  );
};
