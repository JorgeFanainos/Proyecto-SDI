import React from "react";
import "./Footer.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Si necesitas ayuda profesional, no dudes en buscarla aquí!
        </p>
        <p className="footer-subscription-text">
          Puedes eliminar tu membresia en el momento que tú quieras!
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Tu Correo"
            />
            <Button buttonStyle="btn--outline">Suscríbete</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Sobre Nosotros</h2>
            <Link to="/comoFuncionamos">Cómo funcionamos?</Link>
            <Link to="/testimonios">Testimonios</Link>
            <Link to="/colaboradores">Colaboradores</Link>
            <Link to="/terminos">Terminos de Uso</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contáctanos</h2>
            <Link to="/contactos">Contacto</Link>
            <Link to="/soporte">Soporte</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Redes Sociales</h2>
            <a href="https://www.instagram.com/MyHelperSDI" rel="noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com/Paginapsicolog1" rel="noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              MyHelper
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <small className="website-rights">My Helper © 2020</small>
          <div className="social-icons">
            <a
              className="social-icon-link instagram"
              href="https://www.instagram.com/MyHelperSDI"
              rel="noreferrer"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              className="social-icon-link twitter"
              href="https://twitter.com/Paginapsicolog1"
              rel="noreferrer"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
