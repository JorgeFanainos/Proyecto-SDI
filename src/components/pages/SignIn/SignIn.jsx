import React from "react";
import { useState } from "react";
import "../../../App";
import { auth, googleProvider } from "../../../utils/firebaseApp";
import { useHistory } from "react-router-dom";
import "./SignIn.css";
import { Link } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  // HANDLE GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await auth.signInWithPopup(googleProvider);
    history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(values.email, values.password);
    history.push("/");
  };

  return (
    <div class="inicar_sesion">
      <h1 className="h1">Iniciar sesión</h1>
      <p className="p2">Introduce tus datos para Iniciar sesión.</p>
      <br />
      <br />
      <label className="correo">Correo: </label>
      <br />
      <input
        className="input_contra"
        name="email"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleOnChange}
      />
      <br />
      <br />
      <label className="contrasenia">Contraseña: </label>
      <br />
      <input
        className="input_contra"
        name="password"
        id="password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleOnChange}
      />
      <br />
      <br />
      <br />
      <br />
      <Link className="link_registro" to="/registro">
        No tienes cuenta? Registrate
      </Link>
      <button className="boton" onClick={handleSubmit}>
        Iniciar Sesión
      </button>
      <button className="boton" onClick={handleGoogleLogin}>
        Iniciar Sesión con Google
      </button>
    </div>
  );
}

export default SignIn;
