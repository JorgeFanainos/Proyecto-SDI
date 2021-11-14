import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { auth, storage } from "../../../utils/firebaseApp";
import "./Registro.css";
import { Icon2 } from "../Icon";

const RegistroPsico = () => {
  const history = useHistory();
  const { createUserPsico } = useContext(UserContext);
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
    gender: "",
    credenciales: "",
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
      nameError = "Introduzca su nombre correctamente";
    }

    if (!values.lastName.match(letters) || lastName < 4) {
      lastNameError = "Introduzca su nombre correctamente";
    }

    if (password < 6) {
      pswrdError = "Su contrasena no debe tener menos de 6 caracteres";
    }
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      registered = "Ingrese un correo correcto";
    }
    if (tlf < 6) {
      tlfError = "Introduzca correctamente su telefono";
    }
    if (values.confirmed_password !== values.password) {
      cpswrdError = "Sus Claves deben coincidir";
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

  let file = {};
  const choosefile = (e) => {
    file = e.target.files[0];
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
        await storage
          .ref("usersPsico/" + auth.currentUser.uid + "/profile.jpg")
          .put(file);

        history.push("/");

        console.log(res.user.uid);
      } catch (error) {
        values.password = "";
        values.confirmed_password = "";

        let registered = "";
        registered = "correo previamente registrado";
        setErrors({ registered });
      }
    } else {
      values.password = "";
      values.confirmed_password = "";
    }
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
          <div className="error">{errors.nameError}</div>
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
            value={values.phoneNumber}
            onChange={handleOnChange}
          />
          <div className="error">{errors.tlfError}</div>
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
          <div className="error">{errors.registered}</div>
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
          <div className="error">{errors.pswrdError}</div>
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
          <div className="error">{errors.cpswrdError}</div>
        </div>

        <div className="newUserItem">
          <label>Credenciales</label>
          <input
            id="credenciales"
            type="file"
            multiple
            variant="filled"
            required
            onChange={choosefile}
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
          </div>
        </div>
      </form>
      <Icon2 />
    </div>
  );
};

export default RegistroPsico;
