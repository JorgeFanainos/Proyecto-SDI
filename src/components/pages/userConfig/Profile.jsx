import React, { useEffect, useState } from "react";
import { db, auth } from "../../../utils/firebaseApp";
import firebase from "firebase/compat/app";

const Profile = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    password: "",
    newpassword: "",
    confirmed_password: "",
    empassword: "",
    confirmEmail: "",
    newemail: "",
  });

  const [display, setdisplay] = useState({
    firstNamed: "",
    lastNamed: "",
    phoneNumberd: "",
    genderd: "",
  });

  const [errors, setErrors] = useState({
    pswrdError: "",
    cpswrdError: "",
    registered: "",
    nameError: "",
    lastNameError: "",
    tlfError: "",
    empswrdError: "",
    cregistered: "",
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  const validate = () => {
    let nameError = "";
    let lastNameError = "";
    let tlfError = "";
    let name = values.firstName.length;
    let lastName = values.lastName.length;
    let tlf = values.phoneNumber.length;
    var letters = /^[A-Za-z]+$/;

    if (name === 0) {
      nameError = false;
    } else if (!values.firstName.match(letters) || name < 4) {
      nameError = "Introduzca su nombre correctamente";
    }
    if (lastName === 0) {
      lastNameError = false;
    } else if (!values.lastName.match(letters) || lastName < 4) {
      lastNameError = "Introduzca su apellido correctamente";
    }

    if (tlf === 0) {
      tlfError = false;
    } else if (tlf < 6) {
      tlfError = "Introduzca correctamente su telefono";
    }

    if (lastNameError || nameError || tlfError) {
      setErrors({
        nameError,
        lastNameError,
        tlfError,
      });
      return false;
    } else if (!tlf && !name && !lastName) {
      window.alert("Debe realizar al menos un cambio");
      return false;
    } else {
      setErrors({
        nameError,
        lastNameError,
        tlfError,
      });
      return true;
    }
  };
  const validatepswrd = () => {
    let pswrdError = "";
    let newpswrdError = "";
    let cpassword = "";
    let confirmpss = values.confirmed_password.lenght;
    let password = values.password.length;
    let newpassword = values.newpassword.length;

    if (password === 0) {
      pswrdError = false;
    } else if (password < 6) {
      pswrdError = "Su contraseña no puede tener menos de 6 caracteres";
    }
    if (newpassword === 0) {
      newpswrdError = false;
    } else if (newpassword < 6) {
      newpswrdError =
        "Su nueva contraseña no puede tener menos de 6 caracteres";
    }
    if (confirmpss < 6) {
      cpassword = "Su nueva contraseña no puede tener menos de 6 caracteres";
    }
    if (values.newpassword !== values.confirmed_password) {
      cpassword = "Sus Claves no coinciden";
    }

    if (pswrdError || newpswrdError || cpassword) {
      setErrors({
        pswrdError,
        newpswrdError,
        cpassword,
      });
      return false;
    } else if (!password && !cpassword && !cpassword) {
      window.alert("Debe realizar al menos un cambio");
      return false;
    } else {
      setErrors({
        newpswrdError,
        pswrdError,
        cpassword,
      });
      return true;
    }
  };

  const validateUpdate = async () => {
    if (values.firstName !== "") {
      await db.collection("users").doc(auth.currentUser.uid).update({
        name: values.firstName,
      });
    }
    if (values.lastName !== "") {
      await db.collection("users").doc(auth.currentUser.uid).update({
        lastname: values.lastName,
      });
    }
    if (values.gender !== "") {
      await db.collection("users").doc(auth.currentUser.uid).update({
        gender: values.gender,
      });
    }
    if (values.phoneNumber !== "") {
      await db.collection("users").doc(auth.currentUser.uid).update({
        phoneNumber: values.phoneNumber,
      });
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((doc) => {
            let firstNamed = doc.data().name;
            let lastNamed = doc.data().lastname;
            let emaild = doc.data().email;
            let genderd = doc.data().gender;
            let phoneNumberd = doc.data().phoneNumber;
            setdisplay({
              firstNamed,
              lastNamed,
              emaild,
              genderd,
              phoneNumberd,
            });
          });
      } else {
        // not logged in
      }
    });
  }, []);

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    let isvalid = validate();
    if (isvalid) {
      try {
        console.log("enviado");
        validateUpdate()
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error();
          });
      } catch (error) {
        console.log("error");
      }
    } else {
      console.log("no valido");
      //
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    let isvalid = validatepswrd();
    if (isvalid) {
      reauthenticate(values.password)
        .then(() => {
          var user = firebase.auth().currentUser;
          user
            .updatePassword(values.newpassword)
            .then(() => {
              alert("Password was changed");
            })
            .catch((error) => {
              console.log("f1");
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log("f1");
          console.log(error.message);
        });
    } else {
      console.log("no valido");
      //
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((doc) => {
            let firstNamed = doc.data().name;
            let lastNamed = doc.data().lastname;
            let emaild = doc.data().email;
            let genderd = doc.data().gender;
            let phoneNumberd = doc.data().phoneNumber;
            setdisplay({
              firstNamed,
              lastNamed,
              emaild,
              genderd,
              phoneNumberd,
            });
          });
      } else {
        // not logged in
      }
    });
  }, []);

  return (
    <div className="newUser">
      <div>{display.firstNamed}</div>
      <div>{display.lastNamed}</div>
      <div>{display.emaild}</div>
      <div>{display.phoneNumberd}</div>
      <div>{display.genderd}</div>
      <form className="newUserForm" onSubmit={handleSubmit1}>
        <div className="newUserItem">
          <label>Nombre</label>
          <input
            type="text"
            placeholder={display.firstNamed}
            name="firstName"
            variant="filled"
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
            placeholder={display.lastNamed}
            variant="filled"
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
            placeholder={display.phoneNumberd}
            variant="filled"
            value={values.phoneNumber}
            onChange={handleOnChange}
          />
          <div className="error">{errors.tlfError}</div>
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
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
      <h2> Cambie su contraseña</h2>
      <p>
        Para cambiar su contraseña es necesario introducir su contrasena actual
      </p>
      <form className="newUserForm" onSubmit={handleSubmit2}>
        <div className="newUserItem">
          <label>Contraseña Actual</label>
          <input
            name="password"
            type="password"
            placeholder="Ingrese su contraseña actual"
            variant="filled"
            required
            value={values.password}
            onChange={handleOnChange}
          />
          <div className="error">{errors.pswrdError}</div>
        </div>

        <div className="newUserItem">
          <label>Nueva Contraseña</label>
          <input
            name="newpassword"
            type="password"
            placeholder="Ingrese su nueva contraseña"
            variant="filled"
            required
            value={values.newpassword || ""}
            onChange={handleOnChange}
          />

          <div className="error">{errors.newpswrdError}</div>
        </div>

        <div className="newUserItem">
          <label>Confirmar Nueva contraseña</label>
          <input
            name="confirmed_password"
            type="password"
            placeholder="Confirme su nueva contraseña"
            variant="filled"
            required
            value={values.confirmed_password || ""}
            onChange={handleOnChange}
          />

          <div className="error">{errors.cpassword}</div>
        </div>
        <div>
          <br />
          <br />
          <div className="boton-registro">
            <button className="link" type="submit">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
