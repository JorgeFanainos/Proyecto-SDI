import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';
import 'firebase/auth'
import { firebaseApp } from '../../firebaseApp';
import { Icon } from './Icon';

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
    <div className="newUser">
      <h1 className="newUserTitle">Registrarse</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
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
          onChange={e => {
          e.preventDefault()
          setLastName(e.target.value)}}/>
        </div>
        <div className="newUserItem">
          <label>Numero De Teléfono</label>
          <input type="number" placeholder="+58 (xxx) xxx xxxx"
          variant="filled"
          required
          value={setPhoneNumber}
          onChange={e => {
          e.preventDefault()
          setPhoneNumber(e.target.value)}}/>
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
      <div >
        <br/>
        <br/>
        <div className='boton-registro'>
        <Link className='link' to='/perfilusuario'>
          Registrate 
        </Link>
        <Link className='link' to='/'>
          Cancelar
        </Link>
        <Link className='link' to='/registropsico'>
          Eres Psicologo?
        </Link>
        
          </div>
        </div>
    
    </form>
    <Icon />
    </div>
  );
};

export default Registro;