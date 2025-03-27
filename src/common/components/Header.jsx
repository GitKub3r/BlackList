import "../../styles/components/Header.css";
import { Link } from "react-router";
import navlinks from "../json/header/nav-links.json";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const [links, setLinks] = useState(navlinks.unlogged.navLinks); // Default to unlogged navlinks

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuthenticated) {
      setLinks(navlinks.logged.navLinks);
    } else {
      setLinks(navlinks.unlogged.navLinks);
    }
  }, [isAuthenticated]);

  const [firstItem, ...restItems] = links;

  return (
    <header className="main-header">
      <Link to={firstItem.url} className="main-header-home-link">
        <img src={`/assets/icons/${firstItem.icon}`} alt="" />
        <h1>{firstItem.name}</h1>
      </Link>
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
