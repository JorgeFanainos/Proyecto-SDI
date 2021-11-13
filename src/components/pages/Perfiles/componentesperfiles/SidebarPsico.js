import "./Sidebar.css";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";

function SidebarPsico() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Panel</h3>
          <ul className="sidebarList">
            <Link to="/perfilusuario">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Mi Perfil
              </li>
            </Link>
            <br />
          </ul>
          <Link to="/userconfig">
            <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Editar Perfil
            </li>
          </Link>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menú</h3>
          <ul className="sidebarList">
            <br />
            <br />
            <Link to="/testimonios">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Testimonios
              </li>
            </Link>
            <br />
            <br />
            <Link to="/perfilusuario">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Mis Chats
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarPsico;
