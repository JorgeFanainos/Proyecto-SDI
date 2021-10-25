import React from 'react';
import '../App.css';
import { Button, Button2 } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Da ese paso.</h1>
      <p>Recupera hoy tu tranquilidad.</p>
      <p>Comienza tus sesiones de terapia online.</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Iniciar Sesión
        </Button>
        <Button2
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Registrarse 
        </Button2>
        
      </div>
    </div>
  );
}

export default HeroSection;
