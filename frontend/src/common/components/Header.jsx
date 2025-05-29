import "../../styles/components/Header.css";
import { Link } from "react-router";
import navlinks from "../json/header/nav-links.json";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export const Header = () => {
  const { user, isAuthenticated } = useAuth();

  const [links, setLinks] = useState(navlinks.unlogged.navLinks); // Default to unlogged navlinks

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.type === "ADMIN") {
        setLinks(navlinks.admin.navLinks);
      } else {
        setLinks(navlinks.logged.navLinks);
      }
    } else {
      setLinks(navlinks.unlogged.navLinks);
    }
  }, [isAuthenticated, user]);

  // Evita renderizar hasta que el usuario esté cargado si está autenticado
  if (isAuthenticated && !user) {
    return null;
  }

  const [firstItem, ...restItems] = links;

  return (
    <header className="main-header">
      <nav className="main-header-navbar">
        <ul>
          <li className="home-item">
            <Link to={firstItem.url}>
              <img src={`/assets/icons/${firstItem.icon}`} alt="" />
              <h1>{firstItem.name}</h1>
            </Link>
          </li>
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
