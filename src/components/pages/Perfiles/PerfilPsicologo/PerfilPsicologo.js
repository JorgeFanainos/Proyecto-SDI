import "./PerfilPsicologo.css";
import SidebarPsico from "../componentesperfiles/SidebarPsico";
import Infopsico from "../componentesperfiles/infoprinpsicologo";
function PerfilPsicologo() {
  return (
    <div className="container">
      <div className="divsidebar">
        <SidebarPsico />
      </div>
      <div className="textoprfil">
        <h1 className="h1perfil">Bienvenido de nuevo !</h1>
        <Infopsico/>
      </div>
      
      
    </div>
  );
}

export default PerfilPsicologo;
