import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Registro.css";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebaseApp";
import { Icon } from "./Icon";

const Registro = () => {
  const history = useHistory();
  const { createUser } = useContext(UserContext);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmed_password: "",
    gender: "",
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    history.push("/");

    console.log(res.user.uid);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registrarse</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Nombre</label>
          <input
            name="firstName"
            type="text"
            placeholder="Introduzca su nombre"
            variant="filled"
            value={values.firstName}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="newUserItem">
          <label>Apellido</label>
          <input
            name="lastName"
            type="text"
            placeholder="Introduzca su Apellido"
            variant="filled"
            required
            value={values.lastName}
            onChange={handleOnChange}
          />
        </div>

        <div className="newUserItem">
          <label>Numero De Teléfono</label>
          <input
            name="phoneNumber"
            type="number"
            placeholder="+58 (xxx) xxx xxxx"
            variant="filled"
            required
            value={values.phoneNumber}
            onChange={handleOnChange}
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Introduzca su Email"
            variant="filled"
            required
            value={values.email}
            onChange={handleOnChange}
          />
        </div>

        <div className="newUserItem">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="xxxxxxx"
            variant="filled"
            required
            value={values.password}
            onChange={handleOnChange}
          />
        </div>

        <div className="newUserItem">
          <label>Confirmar Contraseña</label>
          <input
            name="confirmed_password"
            type="password"
            placeholder="xxxxxxx"
            variant="filled"
            required
            value={values.confirmed_password}
            onChange={handleOnChange}
          />
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
            <label for="male">Hombre</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleOnChange}
            />
            <label for="female">Mujer</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleOnChange}
            />
            <label for="other">Otro</label>
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
      </form>
      <Icon />
    </div>
  );
};

export default Registro;
