import React, { useState, useEffect, useContext } from "react";
import { Button, Button3 } from "../Button/Button";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import { auth } from "../../utils/firebaseApp";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    history.push("/");
  };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            MyHelper
            <i className="fab fa-typo3"/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {!!user ? null : (
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
            )}
            {!!user ? null : (
              <li className="nav-item">
                <Link
                  to="/psicologos"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Nuestros Psicólogos
                </Link>
              </li>
            )}
            {!!user ? null : (
              <li className="nav-item">
                <Link
                  to="/contacto"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Contáctanos
                </Link>
              </li>
            )}
            {!!user ? (
              <li className="nav-item">
                <Link
                  to="/perfilusuario"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Mi perfil
                </Link>
              </li>
            ) : null}
            {!!user ? (
              <Button buttonStyle="btn--outline" onClick={handleLogout}>
                Log Out, {user.email}
              </Button>
            ) : (
              <Button3 buttonStyle="btn--outline">Iniciar Sesión</Button3>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
