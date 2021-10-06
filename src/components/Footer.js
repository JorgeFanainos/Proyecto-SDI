import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Si necesitas ayuda profesional, no dudes en buscarla aqui!
        </p>
        <p className='footer-subscription-text'>
          Puedes eliminar tu membresia en el momento que tu quieras!
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Tu Correo'
            />
            <Button buttonStyle='btn--outline'>Suscribete</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Sobre Nosotros</h2>
            <Link to='/'>Cómo funcionamos?</Link>
            <Link to='/'>Testimonios</Link>
            <Link to='/'>Colaboradores</Link>
            <Link to='/'>Terminos de Uso</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contactanos</h2>
            <Link to='/'>Contacto</Link>
            <Link to='/'>Soporte</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              PsicoPagina
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>PsicoPagina © 2020</small>
          <div class='social-icons'>
            <a
              class='social-icon-link instagram'
              href='https://www.instagram.com/psicologiaonlinepagina'
              rel='noreferrer'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </a>
            <a
              class='social-icon-link twitter'
              href='https://twitter.com/Paginapsicolog1'
              rel='noreferrer'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </a>
        
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
