import React from "react";
import { useState } from "react";
import "../../../App";
import { auth, googleProvider } from "../../../utils/firebaseApp";
import { useHistory } from "react-router-dom";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { errorCorreo, errorContra, errorTodo, Icon }   from "../Icon";
import '../Registro/Registro.css'
function SignIn() {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailErr: "",
    passErr: "",
    badcred: "",
  });
  const validate = () => {
    let emailErr = "";
    let passErr = "";
    let password = values.password.length;
    if (values.email === "") {
      emailErr = "";
    } else if (!/\S+@\S+\.\S+/.test(values.email)&(values.email<5)) {
      emailErr = errorCorreo();
    }
    if (password < 6) {
      passErr = errorContra();
    }
    if ((!/\S+@\S+\.\S+/.test(values.email))& (password < 6)){
      errorTodo()
    }

    if (emailErr || passErr) {
      setErrors({
        emailErr,
        passErr,
      });
      return false;
    }

    return true;
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  // HANDLE GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await auth
      .signInWithPopup(googleProvider)
      .then(function (result) {
        console.log("result", result);
        history.push("/perfilusuario");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password);
        history.push("/perfilusuario");
      } catch (error) {
        let badcred = " ";
        badcred = " ";
        setErrors({ badcred }& errorTodo());
      }
    } else {
      console.log("f");
     
    }
  };

  return (
    <div class="inicar_sesion">
      <h1 className="h1">Iniciar sesión</h1>
      <p className="p2">Introduce tus datos para Iniciar sesión.</p>
      <br />
      <br />
      <div className="ContenedorTODO">
      <div className="contenedorini">
        <div className="newUserItem">
          <label>Correo</label>
          <br />
          <input
            className="input_contra"
            name="email"
            id="email"
            type="email"
            placeholder="Ingrese su correo"
            value={values.email}
            onChange={handleOnChange}
          />
          <div class="error">{errors.emailErr}</div>
        </div>
        <br />
        <br />
        <div className="newUserItem">
          <label>Contraseña</label>
          <br />
            <input
              className="input_contra"
              name="password"
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={values.password}
              onChange={handleOnChange}
            />
            <div class="error">{errors.passErr}</div>
          </div>
          <br />
          <br />
            <Link className="boton" to="/registro">
              No tienes cuenta? Registrate
            </Link>
            <button className="boton" onClick={handleSubmit}>
              Iniciar Sesión
            </button>
            <button className="boton" onClick={handleGoogleLogin}>
              Iniciar Sesión con Google
            </button><div class="error">{errors.badcred}</div>
      </div>
          <div className="contenedoricon">
            <Icon />
          </div>
      </div>    
    </div>
  );
}

export default SignIn;
