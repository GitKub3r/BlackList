import "../../styles/components/Footer.css";

import Twitter from "../../../public/assets/logos/Twitter.png";
import Instagram from "../../../public/assets/logos/Instagram.png";
import Gmail from "../../../public/assets/logos/Gmail.png";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <h2 className="copyright">&copy; {year} LOLCGM</h2>
      <div className="main-footer-content">
        <div className="software-container">
          <h3>We are open source</h3>
          <p>
            Check it <a href="">out</a>
          </p>
        </div>
        <div className="contact-container"></div>
        <div className="policy-container"></div>
      </div>
    </footer>
  );
};
