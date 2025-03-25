import { ImageBox } from "../components/ImageBox";
import { WrapLayout } from "../layouts/WrapLayout";
import Texts from "../json/home/text.json";
import "../../styles/pages/Home.css";

export const Home = () => {
  const nComps = Object.values(Texts);
  let reversed = false;

  return (
    <section className="home-page">
      {nComps.map((comp, index) => (
        <WrapLayout key={index} contrast={reversed}>
          <ImageBox
            title={comp.title}
            subtitle={comp.subtitle}
            description={comp.description}
            image={comp.image}
            alt={comp.alt}
            reversed={reversed}
          />

          {(reversed = !reversed)}
        </WrapLayout>
      ))}

      <div className="discord-button-container">
        <button id="discord-button">
          <a href="https://discord.gg/wZqwWUPQ">Join Now</a>
        </button>
      </div>
    </section>
  );
};
