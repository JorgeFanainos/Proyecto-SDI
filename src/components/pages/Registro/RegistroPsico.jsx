import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { auth, storage } from "../../../utils/firebaseApp";
import "./Registro.css";
import {
  Icon2,
  errorCorreoRegistrado,
  errorContra,
  errorApelli,
  errorContraInv,
  errorCorreo,
  errorNombre,
  errorTelef,
  Timer,
  mensajeaceptado,
  mensajenegado,
  mensajependiente
} from "../Icon";

const RegistroPsico = () => {
  const history = useHistory();
  const { createUser, setUser } = useContext(UserContext);
  const [file, setfile] = useState(null);
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
    } else if (auth.fetchSignInMethodsForEmail(values.email).length !== 0) {
      console.log(auth.fetchSignInMethodsForEmail(values.email));
      registered = errorCorreoRegistrado();
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

  const choosefile = (e) => {
    if (e.target.files[0]) {
      setfile(e.target.files[0]);
    }
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
      const timer = Timer();
      try {
        const res = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        const imgp = await storage
          .ref("FotosPerfil/defaultimg.png")
          .getDownloadURL();
        const newProfile = {
          name: values.firstName,
          lastname: values.lastName,
          email: values.email,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          rol: "psicologo",
          bio: "",
          especialidad: [],
          schedule: [],
          feedback: [],
          ranking: 0,
          status: "standby",
          img: imgp,
        };
        await createUser(newProfile, res.user.uid);
        setUser(newProfile);
        await storage.ref("credentials/" + auth.currentUser.uid).put(file);

        auth.signOut();
         //Eliminar push a perfil psicologo
         mensajependiente()
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
  console.log(file);

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registrarse Como Psicologo</h1>
      <p className="p1">Completa el formulario para completar tu cuenta</p>
      <p className="p1">Recuerda insertar tus credenciales</p>
      <br />
      <br />
      <br />
      <div className="ContenedorTODO11">
        <form className="newUserForm" onSubmit={handleSubmit}>
          <div className="divcontenedorpsico">
            <div className="divcredenciales">
              <div className="newUserItemCredenciales">
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
            </div>
            <div className="divinputs">
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
                <div class="error">{errors.nameError}</div>
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
                <div class="error">{errors.lastNameError}</div>
              </div>
              <div className="newUserItem">
                <label>Numero De Tel??fono</label>
                <input
                  name="phoneNumber"
                  type="number"
                  placeholder="+58 (xxx) xxx xxxx"
                  variant="filled"
                  required
                  value={values.phoneNumber}
                  onChange={handleOnChange}
                />
                <div class="error">{errors.tlfError}</div>
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
                <div class="error">{errors.registered}</div>
              </div>
              <div className="newUserItem">
                <label>Contrase??a</label>
                <input
                  name="password"
                  type="password"
                  placeholder="xxxxxxx"
                  variant="filled"
                  required
                  value={values.password}
                  onChange={handleOnChange}
                />
                <div class="error">{errors.pswrdError}</div>
              </div>

              <div className="newUserItem">
                <label>Confirme su contrase??a</label>
                <input
                  name="confirmed_password"
                  type="password"
                  placeholder="xxxxxxx"
                  variant="filled"
                  required
                  value={values.confirmed_password}
                  onChange={handleOnChange}
                />
                <div class="error">{errors.cpswrdError}</div>
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

                <div className="boton-registro">
                  <button className="link" type="submit">
                    Registrarse
                  </button>
                  <Link className="link" to="/">
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="contenedoricon">
          <Icon2 />
        </div>
      </div>
    </div>
  );
};

export default RegistroPsico;
