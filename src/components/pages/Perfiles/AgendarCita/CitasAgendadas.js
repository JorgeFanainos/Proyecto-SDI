import "./CitasAgendadas.css";
import SidebarPsico from "../componentesperfiles/SidebarPsico";
import HeroCitas from "./HeroCitas";

function CitasAgendadas() {
  return (
    <div className="container">
      <SidebarPsico />
      <HeroCitas/>
    </div>
  );
}

export default CitasAgendadas;