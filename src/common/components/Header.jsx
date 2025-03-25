import "../../styles/components/Header.css";
import { Link } from "react-router";

export const Header = ({ links }) => {
  const [firstItem, ...restItems] = links;

  return (
    <header className="main-header">
      <div className="main-header-home-link">
        <Link to={firstItem.url}>
          <img src={`/assets/icons/${firstItem.icon}`} alt="" />
          <h1>{firstItem.name}</h1>
        </Link>
      </div>
      <nav className="main-header-navbar">
        <ul>
          {restItems.map((link, index) => (
            <li key={index}>
              <Link to={link.url} className="hover-link">
                <img src={`/assets/icons/${link.icon}`} alt="" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
