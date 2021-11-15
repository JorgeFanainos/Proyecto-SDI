import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Registro.css";
import { UserContext } from "../../../context/UserContext";
import { auth } from "../../../utils/firebaseApp";
import { Icon, errorNombre, errorContra, errorCorreo,errorApelli,errorTelef, errorContraInv } from "../Icon";

const Registro = () => {
  const history = useHistory();
  const { createUser } = useContext(UserContext);
  const [errors, setErrors] = useState({
    pswrdError: "",
    cpswrdError: "",
    registered: "",
    nameError: "",
    lastNameError: "",
    tlfError: "",
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmed_password: "",
    gender: "Otro",
  });

  const validate = () => {
    let nameError = "";
    let lastNameError = "";
    let cpswrdError = "";
    let tlfError = "";
    let pswrdError = "";
    let registered = "";
    let password = values.password.length;
    let name = values.firstName.length;
    let lastName = values.lastName.length;
    let tlf = values.phoneNumber.length;
    var letters = /^[A-Za-z]+$/;

    if (!values.firstName.match(letters) || name < 4) {
      nameError = errorNombre();
    }

    if (!values.lastName.match(letters) || lastName < 4) {
      lastNameError = errorApelli();
    }

    if (password < 6) {
      pswrdError = errorContra();
    }
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      registered = errorCorreo();
    }
    if (tlf < 11) {
      tlfError = errorTelef();
    }
    if (values.confirmed_password !== values.password) {
      cpswrdError = errorContraInv();
    }

    if (
      cpswrdError ||
      registered ||
      pswrdError ||
      lastNameError ||
      nameError ||
      tlfError
    ) {
      setErrors({
        cpswrdError,
        registered,
        pswrdError,
        nameError,
        lastNameError,
        tlfError,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const res = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );

        await createUser(
          {
            name: values.firstName,
            lastname: values.lastName,
            email: values.email,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
          },
          res.user.uid
        );

        history.push("/perfilusuario");

        console.log(res.user.uid);
      } catch (error) {
        values.password = "";
        values.confirmed_password = "";
        let registered = "";
        registered = "";
        setErrors({ registered });
      }
    } else {
      values.password = "";
      values.confirmed_password = "";
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registrarse</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
      <div className="ContenedorTODO">
      <form className="newUserForm" onSubmit={handleSubmit}>
      <div className="divcontenedor">
        <div className="newUserItem">
          <label>Nombre</label>
          <input
            name="firstName"
            type="text"
            placeholder="Introduzca su nombre"
            variant="filled"
            required
            value={values.firstName || ""}
            onChange={handleOnChange}
          />
          <div className="error">{errors.nameError}</div>
        </div>

        <div className="newUserItem">
          <label>Apellido</label>
          <input
            name="lastName"
            type="text"
            placeholder="Introduzca su Apellido"
            variant="filled"
            required
            value={values.lastName || ""}
            onChange={handleOnChange}
          />
          <div className="error">{errors.lastNameError}</div>
        </div>

        <div className="newUserItem">
          <label>Numero De Teléfono</label>
          <input
            name="phoneNumber"
            type="number"
            placeholder="+58 (xxx) xxx xxxx"
            variant="filled"
            required
            value={values.phoneNumber || ""}
            onChange={handleOnChange}
          />
        </div>

        <div className="newUserItem">
          <label>Correo</label>
          <input
            name="email"
            placeholder="Introduzca su Email"
            variant="filled"
            required
            value={values.email || ""}
            onChange={handleOnChange}
          />
<<<<<<< HEAD
=======
          <div className="error">{errors.registered}</div>
>>>>>>> configuracion
        </div>

        <div className="newUserItem">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="xxxxxxx"
            variant="filled"
            required
            value={values.password || ""}
            onChange={handleOnChange}
          />
          <div className="error">{errors.pswrdError}</div>
        </div>

        <div className="newUserItem">
          <label>Confirmar Contraseña</label>
          <input
            name="confirmed_password"
            type="password"
            placeholder="xxxxxxx"
            variant="filled"
            required
            value={values.confirmed_password || ""}
            onChange={handleOnChange}
          />

          <div className="error">{errors.cpswrdError}</div>
        </div>

        <div className="newUserItem">
          <label>Genero</label>
          <div className="newUserGender">
            <input
              name="gender"
              type="radio"
              id="gender"
              value="male"
              onChange={handleOnChange}
            />
            <label htmlFor="male">Hombre</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleOnChange}
            />
            <label htmlFor="female">Mujer</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleOnChange}
            />
            <label htmlFor="other">Otro</label>
          </div>
        </div>

        <div>
          <br />
          <br />
          <div className="boton-registro">
            <button className="link" type="submit">
              Registrarse
            </button>

            <Link className="link" to="/">
              Cancelar
            </Link>
            <Link className="link" to="/registropsico">
              Eres Psicologo?
            </Link>
          </div>
        </div>
        </div>
      </form>
      <div className="contenedoricon">
      <Icon />
      </div>
      </div>
    </div>
  );
};

export default Registro;
