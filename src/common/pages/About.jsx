import { TextBox } from "../components/TextBox";
import Data from "../json/about/about-data.json";
import Rules from "../json/about/blacklist-rules.json";
import { WrapLayout } from "../layouts/WrapLayout";
import "../../styles/pages/About.css";

export const About = () => {
  const info = Object.values(Data);
  let change = false;

  return (
    <section className="about-page center-column">
      {info.map((inf, index) => (
        <WrapLayout key={index} contrast={change}>
          <TextBox
            title={inf.title}
            subtitle={inf.subtitle}
            description={inf.description}
            reversed={change}
          />

          {(change = !change)}
        </WrapLayout>
      ))}

      <hr />

      <div className="blacklist-guide-container">
        <ol className="blacklist-guide fade-in">
          {Rules.map((obj, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: obj.rule }} />
          ))}
        </ol>
      </div>
    </section>
  );
};
