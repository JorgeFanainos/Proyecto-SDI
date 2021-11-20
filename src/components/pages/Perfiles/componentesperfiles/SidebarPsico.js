import "./Sidebar.css";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

function SidebarPsico() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Panel</h3>
          <ul className="sidebarList">
            <Link to="/perfilPsicologo">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Mi Perfil
              </li>
            </Link>
            <br />
          </ul>
          <Link to="/userconfigpsicologo">
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
            <Link to="/citasagendadas">
              <li className="sidebarListItem">
                <DateRangeIcon className="sidebarIcon" />
                Citas Agendadas
              </li>
            </Link>
            <br />
            <br />
            <Link to="/chat">
              <li className="sidebarListItem">
                <ChatIcon className="sidebarIcon" />
                Mis Chats
              </li>
            </Link>
            <br />
            <br />
            <Link to="/historial">
              <li className="sidebarListItem">
                <LibraryBooksIcon className="sidebarIcon" />
                Historia Pacientes
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarPsico;
