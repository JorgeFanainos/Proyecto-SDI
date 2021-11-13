import React from "react";
import Navbar from "./components/NavBar/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registro from "./components/pages/Registro/Registro";
import SignIn from "./components/pages/SignIn/SignIn";
import Cards from "./components/Cards/Cards";
import Footer from "./components/Footer/Footer";
import RegistroPsico from "./components/pages/Registro/RegistroPsico";
import terminos from "./components/pages/PageFooter/Terminos";
import Colaboradores from "./components/pages/PageFooter/Colaboradores";
import comoFuncionamos from "./components/pages/PageFooter/ComoFuncionamos";
import Testimonios from "./components/pages/PageFooter/Testimonios";
import Contacto from "./components/pages/PageFooter/Contacto";
import Soporte from "./components/pages/PageFooter/Soporte";
import Pasarela from "./components/pages/Stripe/Pasarela";
import PerfilUsuario from "./components/pages/Perfiles/PerfilUser/PerfilUsuario";
import AgendarCita from "./components/pages/Perfiles/AgendarCita/AgendarCita";
import BuscarPsicologo from "./components/pages/BuscarPsicologos/BuscarPsicologos";
import UserContextProvider from "./context/UserContext.jsx";
import userConfig from "./components/pages/Perfiles/PerfilUser/userConfig";
import PerfilPsicologo from "./components/pages/Perfiles/PerfilPsicologo/PerfilPsicologo";

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
          <Route path="/userconfig" component={userConfig} />
          <Route path="/agendarcita" component={AgendarCita} />
          <Route path="/buscarpsicologos" component={BuscarPsicologo} />
          <Route path="/perfilPsicologo" component={PerfilPsicologo} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
