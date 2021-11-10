import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registro from "./components/pages/Registro";
import SignIn from "./components/pages/SignIn";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import RegistroPsico from "./components/pages/RegistroPsico";
import terminos from "./components/pages/pagesFooter/Terminos";
import Colaboradores from "./components/pages/pagesFooter/Colaboradores";
import comoFuncionamos from "./components/pages/pagesFooter/ComoFuncionamos";
import Testimonios from "./components/pages/pagesFooter/Testimonios";
import Contacto from "./components/pages/pagesFooter/Contacto";
import Soporte from "./components/pages/pagesFooter/Soporte";
import Pasarela from "./components/pages/Pasarela";
import PerfilUsuario from "./components/pages/Perfiles/PerfilUsuario";
import AgendarCita from "./components/pages/Perfiles/AgendarCita/AgendarCita";
import BuscarPsicologo from "./components/pages/pagesFooter/BuscarPsicologos/BuscarPsicologos";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/registropsico" component={RegistroPsico} />
          <Route path="/registro" component={Registro} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/psicologos" component={Cards} />
          <Route path="/contacto" component={Footer} />
          <Route path="/contactos" component={Contacto} />
          <Route path="/comoFuncionamos" component={comoFuncionamos} />
          <Route path="/testimonios" component={Testimonios} />
          <Route path="/colaboradores" component={Colaboradores} />
          <Route path="/terminos" component={terminos} />
          <Route path="/soporte" component={Soporte} />
          <Route path="/pasarela" component={Pasarela} />
          <Route path="/perfilusuario" component={PerfilUsuario} />
          <Route path="/agendarcita" component={AgendarCita} />
          <Route path="/buscarpsicologos" component={BuscarPsicologo} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
