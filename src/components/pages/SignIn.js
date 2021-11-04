import React, { Component } from 'react';
import '../../App.css';
import firebaseApp from '../../firebaseApp';
import { getAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import {useHistory} from 'react-router-dom';
import './SignIn.css'
import { Link } from 'react-router-dom';
import { Button, Button2 } from '../Button';
import { Icon } from './Icon';

function SignIn({
  user,
  signOut,
  signWithGoogle
}){
  const provider = new GoogleAuthProvider();
  const auth = new getAuth();
  const router = useHistory();
  const signGoogle = (auth, provider) => {
    signInWithPopup(auth, provider).then((result) => {
      const token = result.user.accessToken
      sessionStorage.setItem('token', token);
      const user = result.user;
      }).then(()=>{
        router.push('/')
      });
      
  }
  
  const onClick = () => {
    try {
      signGoogle(auth,provider);

    }catch (error) {
      console.log(error);
    }
  }
  
  console.log(user)
    return (
      <div class='inicar_sesion'>
        <h1 className='h1'>Iniciar sesión</h1>
        <p className='p2'>Introduce tus datos para Iniciar sesión.</p>
        <br/>
        <br/>
        <label className='correo'>Correo: </label>
        <br/>
        <input className='input_contra' type="textarea" 
          name="textValue"
        />
        <br/>
        <br/>
        <label className='contrasenia'>Contraseña: </label>
        <br/>
        <input className='input_contra' type="textarea" 
          name="textValue"
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <Link className='link_registro' to='/registro'>
          No tienes cuenta? Registrate 
        </Link>
        {
        user !== undefined ? <button onClick={signOut}>Cerrar Sesión</button>
        : <button className='boton'  onClick={onClick} >Iniciar Sesión con Google</button>

      }
      <Icon/>
      </div>
    );
}


export default SignIn