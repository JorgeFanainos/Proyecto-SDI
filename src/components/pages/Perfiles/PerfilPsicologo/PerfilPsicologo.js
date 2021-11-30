import "./PerfilPsicologo.css";
import SidebarPsico from "../componentesperfiles/SidebarPsico";
import HeroPsicologo from "../componentesperfiles/HeroPsicologo";
function PerfilPsicologo() {
  return (
    <div className="container">
      <div className="divsidebar">
        <SidebarPsico />
      </div>
      
      <HeroPsicologo />
      
      
    </div>
  );
}

export default PerfilPsicologo;
