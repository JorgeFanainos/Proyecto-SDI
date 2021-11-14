import React from "react";
import { useState, useContext } from "react";
import "../../../App";
import { auth, googleProvider } from "../../../utils/firebaseApp";
import { useHistory } from "react-router-dom";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

function SignIn() {
  const history = useHistory();
  const { getUserByEmail, createUser, setUser } = useContext(UserContext);

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
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      emailErr = "Ingrese un correo correcto";
    }
    if (password < 6) {
      passErr = "Ingrese una contrasena valida";
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
      })
      .then(async () => {
        const profile = await getUserByEmail(auth.currentUser.email);
        const fullname = auth.currentUser.displayName;
        const name = fullname.split(" ")[0];
        const lastname = fullname.split(" ")[1];
        if (!profile) {
          const newProfile = {
            name: name,
            lastname: lastname,
            email: auth.currentUser.email,
            gender: "",
            phoneNumber: auth.currentUser.phoneNumber,
          };
          await createUser(newProfile, auth.currentUser.uid);
          setUser(newProfile);
        } else {
          console.log("usuario viejo");
          setUser(profile);
        }
      })
      .catch(function (error) {
        console.log("cancelado");
        setUser(null);
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
        let badcred = "";
        badcred = "Su usuario o clave son incorrectos";
        setErrors({ badcred });
      }
    } else {
      console.log("f");
    }
  };

  return (
    <div className="inicar_sesion">
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
      <div className="error">{errors.emailErr}</div>
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
      <div className="error">{errors.passErr}</div>
      <br />
      <br />
      <br />
      <br />
      <Link className="link_registro" to="/registro">
        No tienes cuenta? Registrate
      </Link>
      <Link className="link_registro" to="/resetpswd">
        Olvidaste tu contrasena?
      </Link>
      <button className="boton" onClick={handleSubmit}>
        Iniciar Sesión
      </button>
      <div className="error">{errors.badcred}</div>
      <button className="boton" onClick={handleGoogleLogin}>
        Iniciar Sesión con Google
      </button>
    </div>
  );
}

export default SignIn;
