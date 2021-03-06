import React from "react";
import Navbar from "./components/NavBar/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registro from "./components/pages/Registro/Registro";
import SignIn from "./components/pages/SignIn/SignIn";
import ResetPassword from "./components/pages/SignIn/ResetPassword";
import Cards from "./components/Cards/Cards";
import Footer from "./components/Footer/Footer";
import RegistroPsico from "./components/pages/Registro/RegistroPsico";
import terminos from "./components/pages/PageFooter/Terminos";
import Colaboradores from "./components/pages/PageFooter/Colaboradores";
import comoFuncionamos from "./components/pages/PageFooter/ComoFuncionamos";
import Testimonio from "./components/pages/PageFooter/Testimonios";
import Contacto from "./components/pages/PageFooter/Contacto";
import Soporte from "./components/pages/PageFooter/Soporte";
import PerfilUsuario from "./components/pages/Perfiles/PerfilUser/PerfilUsuario";
import AgendarCita from "./components/pages/Perfiles/AgendarCita/AgendarCita";
import BuscarPsicologo from "./components/pages/BuscarPsicologos/BuscarPsicologos";
import UserContextProvider from "./context/UserContext.jsx";
import userConfig from "./components/pages/userConfig/Profile";
import userConfigpsicologo from "./components/pages/userConfig/ProfilePsicologo";
import PerfilPsicologo from "./components/pages/Perfiles/PerfilPsicologo/PerfilPsicologo";
import CitasAgendadas from "./components/pages/Perfiles/AgendarCita/CitasAgendadas";
import CitasAgendadasUsuario from "./components/pages/Perfiles/componentesperfiles/Hero";
import Admin from "./components/pages/PerfilAdmin/admin";
import Historial from "./components/pages/HistorialPacientes/Historial";
import Chat from "./components/Chat/Chat";

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
          <Route path="/admin" component={Admin} />
          <Route path="/resetpswd" component={ResetPassword} />
          <Route path="/psicologos" component={Cards} />
          <Route path="/contacto" component={Footer} />
          <Route path="/contactos" component={Contacto} />
          <Route path="/paginaProblemas" component={comoFuncionamos} />
          <Route path="/testimonios" component={Testimonio} />
          <Route path="/colaboradores" component={Colaboradores} />
          <Route path="/terminos" component={terminos} />
          <Route path="/soporte" component={Soporte} />
          <Route path="/perfilusuario" component={PerfilUsuario} />
          <Route path="/userconfig" component={userConfig} />
          <Route path="/userconfigpsicologo" component={userConfigpsicologo} />
          <Route path="/agendarcita" component={AgendarCita} />
          <Route path="/buscarpsicologos" component={BuscarPsicologo} />
          <Route path="/perfilPsicologo" component={PerfilPsicologo} />
          <Route path="/citasagendadas" component={CitasAgendadas} />
          <Route
            path="/citasagendadasusuario"
            component={CitasAgendadasUsuario}
          />
          <Route path="/historial" component={Historial} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
