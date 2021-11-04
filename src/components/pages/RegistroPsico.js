import react from "react";
import React, { useState } from 'react';
import { Button, Button2, ButtonCancelar } from '../Button';
import { Link } from 'react-router-dom';
import './Registro.css';
import { Icon2 } from "./Icon";

const RegistroPsico = ({ handleClose }) => {
    // Crear variables para cada input
    const [firstName, setFirstName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = e => {
      e.preventDefault();
      console.log(firstName, phoneNumber, lastName, email, password);
      handleClose();
    };
  
    return (
      <div className="newUser">
      <h1 className="newUserTitle">Registrarse Como Psicologo</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
      <p className="p1">Recuerda introducir tus credenciales para registrarte como un especialista</p>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Nombre</label>
          <input type="text" placeholder="Jhon"
          variant="filled"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Apellido</label>
          <input type="text" placeholder="Doe"
          variant="filled"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Numero De Teléfono</label>
          <input type="number" placeholder="+58 (xxx) xxx xxxx"
          variant="filled"
          required
          value={setPhoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="jhon@email.com"
          variant="filled"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Contraseña</label>
          <input type="password" placeholder="xxxxxxx"
          variant="filled"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Contraseña</label>
          <input type="password" placeholder="xxxxxxx"
          variant="filled"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Genero</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Hombre</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Mujer</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Otro</label>
          </div>
        </div>
      
      <div  >  
        <br/>
        <br/>
        <div className='boton-registro'>
        <Link className='link' to='/sign-in'>
          Registrate 
        </Link>
        <Link className='link' to='/'>
          Cancelar
        </Link>
          </div>
        </div>
    
    </form>
    <Icon2 />
    </div>
    );
  };
  
  export default RegistroPsico;
  