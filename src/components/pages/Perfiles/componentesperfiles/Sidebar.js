import "./Sidebar.css";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Sidebar() {
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
            <Link to="/buscarpsicologos">
              <li className="sidebarListItem">
                <SearchIcon className="sidebarIcon" />
                Buscar Psicologos
              </li>
            </Link>
            <br />
            <br />
            <Link to="/testimonios">
              <li className="sidebarListItem">
                <ArrowForwardIcon className="sidebarIcon" />
                Testimonios
              </li>
            </Link>
            <br />
            <br />
            <Link to="/perfilusuario">
              <li className="sidebarListItem">
                <ChatIcon className="sidebarIcon" />
                Mis Chats
              </li>
            </Link>
            <br />
            <br />
            <Link to="/agendarcita">
              <li className="sidebarListItem">
                <DateRangeIcon className="sidebarIcon" />
                Agendar una Cita
              </li>
            </Link>
            <br />
            <br />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
