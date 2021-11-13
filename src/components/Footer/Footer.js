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
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Sobre Nosotros</h2>
            <Link to="/comoFuncionamos">Cómo funcionamos?</Link>
            <Link to="/testimonios">Testimonios</Link>
            <Link to="/colaboradores">Colaboradores</Link>
            <Link to="/terminos">Terminos de Uso</Link>
          </div>
          <div class="footer-link-items">
            <h2>Contáctanos</h2>
            <Link to="/contactos">Contacto</Link>
            <Link to="/soporte">Soporte</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
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
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              MyHelper
              <i class="fab fa-typo3" />
            </Link>
          </div>
          <small class="website-rights">My Helper © 2020</small>
          <div class="social-icons">
            <a
              class="social-icon-link instagram"
              href="https://www.instagram.com/MyHelperSDI"
              rel="noreferrer"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
            </a>
            <a
              class="social-icon-link twitter"
              href="https://twitter.com/Paginapsicolog1"
              rel="noreferrer"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
