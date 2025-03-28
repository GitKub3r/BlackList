import { ImageBox } from "../components/ImageBox";
import { WrapLayout } from "../layouts/WrapLayout";
import Data from "../json/home/home-data.json";
import "../../styles/pages/Home.css";

export const Home = () => {
  const info = Object.values(Data);
  let change = false;

  return (
    <section className="home-page">
      {info.map((inf, index) => (
        <WrapLayout key={index} contrast={change}>
          <ImageBox
            title={inf.title}
            subtitle={inf.subtitle}
            description={inf.description}
            image={inf.image}
            alt={inf.alt}
            reversed={change}
          />

          {(change = !change)}
        </WrapLayout>
      ))}

      <div className="discord-button-container">
        <button id="discord-button" className="fade-in">
          <a href="https://discord.gg/wZqwWUPQ">Join Now</a>
        </button>
      </div>
    </section>
  );
};
