import { Route, Routes } from "react-router";
import { Header } from "./common/components/Header";
import headerLinks from "./common/json/header/unlogged-links.json";
import { useState } from "react";
import "./styles/app.css";
import { Home } from "./common/pages/Home";
import { Footer } from "./common/components/Footer";

function App() {
  const [links, setLinks] = useState(headerLinks);

  return (
    <>
      <Header links={links} />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
