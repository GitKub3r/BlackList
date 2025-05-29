import { Route, Routes } from "react-router";
import { Header } from "./common/components/Header";
import { Home } from "./common/pages/Home";
import { Footer } from "./common/components/Footer";
import { NotFound } from "./common/pages/NotFound";
import { About } from "./common/pages/About";
import { Login } from "./common/pages/Login";
import { Account } from "./common/pages/Account";
import { Database } from "./common/pages/Database";
import { Champs } from "./common/pages/Champs";
import { Users } from "./common/pages/Users";
import { CreateAccount } from "./common/pages/CreateAccount";
import { UpdateAccount } from "./common/pages/UpdateAccount";
import { ProtectedRoute } from "./common/components/ProtectedRoute";
import { CreatePlayer } from "./common/pages/CreatePlayer";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/database" element={<Database />} />
          <Route path="/champions" element={<Champs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/update-account" element={<UpdateAccount />} />
          <Route path="/players/create" element={<CreatePlayer />} />
        </Route>

        {/* Ruta para no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
