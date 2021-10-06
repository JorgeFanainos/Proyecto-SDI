import React, {Component} from 'react';
import '../../App.css';
import firebaseApp from '../../firebaseApp';
import { getAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import {useHistory} from 'react-router-dom';

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
      <div>
        {
        user !== undefined ? <button onClick={signOut}>Cerrar Sesión</button>
        : <button onClick={onClick}>Iniciar Sesión con Google</button>
      }
      </div>
    );
}


export default SignIn