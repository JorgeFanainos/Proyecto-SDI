import React, { useState } from 'react';
import { Button, Button2, ButtonCancelar } from '../Button';



const Registro = ({ handleClose }) => {
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    handleClose();
  };

  return (
    <form >
      <label className='input-registro'>Nombre
        <input variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}/>
      </label>
      <label className='input-registro'>Apellido
        <input variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}/>
      </label>
      <label className='input-registro'>Correo
        <input variant="filled"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}/>
      </label>
      <label className='input-registro'>contraseña
        <input variant="filled"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}/>
      </label>
      <div className='contenedor-botones'>
        <div className='boton-registro'>
        <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            Registrarse 
          </Button>
          <ButtonCancelar
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            Cancelar 
          </ButtonCancelar>
          </div>
        </div>
    </form>
  );
};

export default Registro;