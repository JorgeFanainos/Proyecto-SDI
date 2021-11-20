import React from "react";
import { useState, useContext } from "react";
import "../../../App";
import { auth, googleProvider, db } from "../../../utils/firebaseApp";
import { useHistory } from "react-router-dom";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { errorCorreo, errorContra, errorTodo, Icon } from "../Icon";
import "../Registro/Registro.css";
import { UserContext } from "../../../context/UserContext";
import { Message } from "@material-ui/icons";

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
    } else if (!/\S+@\S+\.\S+/.test(values.email) & (values.email < 5)) {
      emailErr = errorCorreo();
    }
    if (password < 6) {
      passErr = errorContra();
    }
    if (!/\S+@\S+\.\S+/.test(values.email) & (password < 6)) {
      errorTodo();
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
            rol: "paciente",
            photo: auth.currentUser.photoURL,
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

        if (auth.currentUser) {
          await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .get()
            .then((doc) => {
              let rol = doc.data().rol;
              if (rol === "paciente") {
                history.push("/perfilusuario");
              }
              if (rol === "psicologo") {
                let status = doc.data().status;
                if (status === "standby") {
                  auth.signOut();
                  let badcred = " ";
                  setErrors({ badcred } & errorTodo());
                  auth.signOut(); // FALTA ERROR STAND BY PSICOLOGO
                } else if (status === "rechazado") {
                  // FALTA ERROR PSICOLOGO RECHAZADO
                  let badcred = " ";
                  setErrors({ badcred } & errorTodo());
                  auth.signOut(); // FALTA ERROR STAND BY PSICOLOGO
                } else {
                  history.push("/perfilPsicologo");
                }
              }
              if (rol === "admin") {
                history.push("/admin");
              }
            });
        }
      } catch (error) {
        console.error(error);
        let badcred = " ";
        badcred = " ";
        setErrors({ badcred } & errorTodo());
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
            <div className="error">{errors.emailErr}</div>
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
            <div className="error">{errors.passErr}</div>
          </div>
          <br />
          <br />
          <Link className="boton" to="/registro">
            No tienes cuenta? Registrate
          </Link>
          <div className="Contenedor_botones">
          <button className="boton" onClick={handleSubmit}>
            Iniciar Sesión
          </button>
          <button className="boton" onClick={handleGoogleLogin}>
            Iniciar Sesión con Google
          </button>
          </div>
          <Link className="boton" to="/resetpswd">
            Olvidaste tu contraseña? Restaurala.
          </Link>
          <div className="error">{errors.badcred}</div>
        </div>
        <div className="contenedoricon">
          <Icon />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
