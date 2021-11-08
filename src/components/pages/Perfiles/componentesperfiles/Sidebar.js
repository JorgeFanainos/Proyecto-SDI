import "./Sidebar.css";
import {
  LineStyle,
  PermIdentity,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Panel</h3>
          <ul className="sidebarList">
            <Link to="/perfilusuario" >
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Mi Perfil
            </li>
            </Link>
            <br />
            <Link to="/perfilusuario" >
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Editar Perfil
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menú</h3>
          <ul className="sidebarList">
            <Link to="/buscarpsicologos" >
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Buscar Psicologos
              </li>
            </Link>
            <br/>
            <br/>
            <Link to="/testimonios" >
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Testimonios
              </li>
            </Link>
            <br/>
            <br/>
            <Link to="/perfilusuario" >
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Mis Chats
              </li>
            </Link>
            <br/>
            <br/>
            <Link to="/agendarcita" >
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Agendar una Cita
              </li>
            </Link>
            <br/>
            <br/>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
