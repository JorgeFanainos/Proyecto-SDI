import React, { useState, useEffect, useContext } from "react";
import { Button } from "../Button/Button";
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
            <i className="fab fa-typo3" />
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/psicologos"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Nuestros Psicólogos
              </Link>
            </li>

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

            <li>
              <Link
                to="/sign-in"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
          {!!user ? (
            <Button buttonStyle="btn--outline2" onClick={handleLogout}>
              Log Out, {user.email}
            </Button>
          ) : (
            <Button buttonStyle="btn--outline">Iniciar Sesión</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
