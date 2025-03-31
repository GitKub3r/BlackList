import { Route, Routes } from "react-router";
import { Header } from "./common/components/Header";
import "./styles/app.css";
import { Home } from "./common/pages/Home";
import { Footer } from "./common/components/Footer";
import { NotFound } from "./common/pages/NotFound";
import { About } from "./common/pages/About";
import { Login } from "./common/pages/Login";
import { Account } from "./common/pages/Account";
import { Database } from "./common/pages/Database";
import { Champs } from "./common/pages/Champs";
import { Hosters } from "./common/pages/Hosters";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/database" element={<Database />} />
        <Route path="/champions" element={<Champs />} />
        <Route path="/hosters" element={<Hosters />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
