import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../../utils/firebaseApp";
import firebase from "firebase/compat/app";
import "./Profile.css";
import { updateProfile } from "firebase/auth";
import {
  Icon,
  errorNombre,
  errorContra,
  errorCorreo,
  errorApelli,
  errorTelef,
  errorContraInv,
  Timer2,
} from "../Icon";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";

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
    newimg: "",
  });

  const [display, setdisplay] = useState({
    firstNamed: "",
    lastNamed: "",
    phoneNumberd: "",
    genderd: "",
    img: "",
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
      nameError = errorNombre();
    }
    if (lastName === 0) {
      lastNameError = false;
    } else if (!values.lastName.match(letters) || lastName < 4) {
      lastNameError = errorApelli();
    }

    if (tlf === 0) {
      tlfError = false;
    } else if (tlf < 6) {
      tlfError = errorTelef();
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
      pswrdError = errorContra();
    }
    if (newpassword === 0) {
      newpswrdError = false;
    } else if (newpassword < 6) {
      newpswrdError = errorContra();
    }
    if (confirmpss < 6) {
      cpassword = errorContra();
    }
    if (values.newpassword !== values.confirmed_password) {
      cpassword = errorContraInv();
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
  const handlePicChange = async (e) => {
    //FALTA PONERLE UN TIMER PARA QUE LA PERSONA NO CRISEE
    e.preventDefault();
    const img = e.target.files[0];
    await storage.ref("images/" + auth.currentUser.uid).put(img);
    const newimg = await storage
      .ref("images/" + auth.currentUser.uid)
      .getDownloadURL();
    if (newimg !== "") {
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .update({ img: newimg });
      window.location.reload();
    }
  };
  const handleEditPic = () => {
    const fileinput = document.getElementById("imgInput");
    fileinput.click();
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
            let img = doc.data().img;

            updateProfile(auth.currentUser, {
              displayName: firstNamed + " " + lastNamed,
              phoneNumber: phoneNumberd,
              photoURL: img,
            });
            setdisplay({
              firstNamed,
              lastNamed,
              emaild,
              genderd,
              phoneNumberd,
              img,
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
      const timer = Timer2();
      try {
        console.log("enviado");
        validateUpdate()
          .then(() => {
            db.collection("users")
              .doc(auth.currentUser.uid)
              .get()
              .then((doc) => {
                let firstNamed = doc.data().name;
                let lastNamed = doc.data().lastname;
                let phoneNumberd = doc.data().phoneNumber;
                let photoupdate = doc.data().photo;
                updateProfile(auth.currentUser, {
                  displayName: firstNamed + " " + lastNamed,
                  phoneNumber: phoneNumberd,
                  photoURL: photoupdate,
                })
                  .then(() => {
                    console.log("profile updated");
                  })
                  .catch((error) => {
                    console.error();
                  });
                window.location.reload();
              });
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
      const timer = Timer2();
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
            let img = doc.data().img;
            setdisplay({
              firstNamed,
              lastNamed,
              emaild,
              genderd,
              phoneNumberd,
              img,
            });
          });
      } else {
        // not logged in
      }
    });
  }, []);

  return (
    <div className="newUser">
      <div className="divTexto3">
        <h2 className="newUserTitle">Configure sus datos</h2>
      </div>
      <br />
      <div className="ContenedorTODO">
        <div className="Info1">
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
              <label>Numero De Tel??fono</label>
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

          <h2 className="newUserTitle"> Cambie su contrase??a</h2>

          <form className="newUserForm" onSubmit={handleSubmit2}>
            <div className="newUserItem">
              <label>Contrase??a Actual</label>
              <input
                name="password"
                type="password"
                placeholder="Ingrese su contrase??a actual"
                variant="filled"
                required
                value={values.password}
                onChange={handleOnChange}
              />
              <div className="error">{errors.pswrdError}</div>
            </div>

            <div className="newUserItem">
              <label>Nueva Contrase??a</label>
              <input
                name="newpassword"
                type="password"
                placeholder="Ingrese su nueva contrase??a"
                variant="filled"
                required
                value={values.newpassword || ""}
                onChange={handleOnChange}
              />

              <div className="error">{errors.newpswrdError}</div>
            </div>

            <div className="newUserItem">
              <label>Confirmar Nueva contrase??a</label>
              <input
                name="confirmed_password"
                type="password"
                placeholder="Confirme su nueva contrase??a"
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
      </div>
    </div>
  );
};

export default Profile;
