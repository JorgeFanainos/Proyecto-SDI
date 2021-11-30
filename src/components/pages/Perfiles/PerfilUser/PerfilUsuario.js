import Sidebar from "../componentesperfiles/Sidebar";
import Hero from "../componentesperfiles/Hero";
import "./PerfilUsuario.css";
import Infousuario from "../componentesperfiles/InfoprinUsuario";

function PerfilUsuario() {
  return (
    <div className="container">
      <Sidebar />
      <div className="textoprfil">
        <h1 className="h1perfil">Bienvenido de nuevo !</h1>
        <Infousuario/>
      </div>
    </div>
  );
}

export default PerfilUsuario;
