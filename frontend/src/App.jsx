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
                <Route path="/users" element={<Users />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/update-account" element={<UpdateAccount />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
