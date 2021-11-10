import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { auth, storage } from "../../../utils/firebaseApp";
import "./Registro.css";
import { Icon2 } from "../Icon";

const RegistroPsico = () => {
  const history = useHistory();
  const { createUserPsico } = useContext(UserContext);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmed_password: "",
    gender: "",
    credenciales: "",
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

    await createUserPsico(
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
      <h1 className="newUserTitle">Registrarse Como Psicologo</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
      <p className="p1">Recuerda insertar tus credenciales</p>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Jhon"
            name="firstName"
            variant="filled"
            required
            value={values.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div className="newUserItem">
          <label>Apellido</label>
          <input
            name="lastName"
            type="text"
            placeholder="Doe"
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
            placeholder="jhon@email.com"
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
          <label>Contraseña</label>
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
          <label>Credenciales</label>
          <input
            id="credenciales"
            type="file"
            name="credenciales"
            multiple
            variant="filled"
            required
            value={values.credenciales}
            onChange={handleOnChange}
          />
        </div>
        <div className="newUserItem">
          <label>Genero</label>
          <div className="newUserGender">
            <input
              name="gender"
              type="radio"
              id="male"
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
          </div>
        </div>
      </form>
      <Icon2 />
    </div>
  );
};

export default RegistroPsico;
