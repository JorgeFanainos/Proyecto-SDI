import React, { useState } from 'react';
import { Button, Button2, ButtonCancelar } from '../Button';
import { Link } from 'react-router-dom';
import './Registro.css';
import { Icon2 } from './Icon';
import 'firebase/auth'
import { firebaseApp } from '../../firebaseApp';


const Registro = ({ handleClose }) => {
  // Crear variables para cada input
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, phoneNumber, lastName, email, password);
    
  };

  return (
    <div>
      <h1 className='h1'>Regístrate</h1>
      <p className='p'>Completa el formulario para completar tu cuenta. </p>
      <br/>
      <br/>
      
    <form >
      <label className='input-registro'>Nombre
      <br/>
        <input className='input-registro'
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}/>
        
      </label>
      <br/>
      <label className='input-registro'>Apellido
      <br/>
        <input className='input-registro'
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}/>
      </label>
      <br/>
      <label className='input-registro'>Numero Telefónico
      <br/>
        <input className='input-registro'
        variant="filled"
        required
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}/>
      </label>
      <br/>
      <label className='input-registro'>Correo
      <br/>
        <input className='input-registro'
        variant="filled"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}/>
      </label>
      <br/>
      <label className='input-registro'>Contraseña
      <br/>
        <input className='input-registro'
        variant="filled"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}/>
      </label>
      <br/>
      <label className='input-registro'>Confirmar Contraseña
      <br/>
        <input className='input-registro'
        variant="filled"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}/>
      </label>
      <br/>
      <br/>
      <div className='contenedor-botones'>
        <div className='boton-registro'>
        <Link className='link_registro' to='/sign-in'>
          Registrate 
        </Link>
        <Link className='link_cancelar' to='/'>
          Cancelar
        </Link>
        <Link className='link_cancelar' to='/registropsico'>
          Eres Psicologo? Registrate aquí
        </Link>
        
          </div>
        </div>
    
    </form>
    
    </div>
  );
};

export default Registro;