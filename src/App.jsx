import { Route, Routes } from "react-router";
import { Header } from "./common/components/Header";
import headerLinks from "./common/json/header/unlogged-links.json";
import { useState } from "react";
import "./styles/app.css";
import { Home } from "./common/pages/Home";
import { Footer } from "./common/components/Footer";
import { NotFound } from "./common/pages/NotFound";
import { About } from "./common/pages/About";
import { Login } from "./common/pages/Login";

function App() {
  const [links, setLinks] = useState(headerLinks);

  return (
    <>
      <Header links={links} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
