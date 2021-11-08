import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Registro.css';
import  firebaseApp  from '../../firebaseApp';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Icon } from './Icon';
import {

  Publish,
} from "@material-ui/icons";
const Registro = ({ handleClose }) => {
  // Crear variables para cada input
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed_password, setConfirmed_Password] = useState('');
  const [gender, setGender] = useState('');
  const auth = new getAuth();
  const router = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(firstName, phoneNumber, lastName, email, password, confirmed_password, gender);
    const res = await createUserWithEmailAndPassword(auth, email, password).then(()=>{
      router.push('/perfilusuario')
    });
    console.log(res)
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registrarse</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
      <form className="newUserForm" onSubmit={handleSubmit}>

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
          value={phoneNumber}
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
          value={password}
          onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Contraseña</label>
          <input type="password" placeholder="xxxxxxx"
          variant="filled"
          required
          value={confirmed_password}
          onChange={e => setConfirmed_Password(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Genero</label>
          <div className="newUserGender">
            <input type="radio"  id="gender" value="male" onChange={e=>
            {e.preventDefault()
            setGender(e.target.value)
            }
            }/>
            <label for="male">Hombre</label>
            <input type="radio" name="gender" id="female" value="female" onChange={e=>
            {e.preventDefault()
            setGender(e.target.value)
            }
            }/>
            <label for="female">Mujer</label>
            <input type="radio" name="gender" id="other" value="other" onChange={e=>
            {e.preventDefault()
            setGender(e.target.value)
            }
            }/>
            <label for="other">Otro</label>
          </div>
        </div>
      <div >
        <br/>
        <br/>
        <div className='boton-registro'>
        <button className='link' type='submit'>Registrarse</button>
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