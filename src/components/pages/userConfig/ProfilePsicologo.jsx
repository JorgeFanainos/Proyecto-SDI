import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../../utils/firebaseApp";
import firebase from "firebase/compat/app";
import "./Profile.css";
import { updateProfile } from "firebase/auth";
import {
  errorNombre,
  errorContra,
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
    bio: "",
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
    biod: "",
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
    bioerror: "",
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
    let bioerror = "";
    let name = values.firstName.length;
    let lastName = values.lastName.length;
    let bio = values.bio.length;
    let tlf = values.phoneNumber.length;
    var letters = /^[A-Za-z]+$/;

    if (name === 0) {
      nameError = false;
    } else if (!values.firstName.match(letters) || name < 4) {
      nameError = errorNombre();
    }
    if (bio === 0) {
      bioerror = false;
    } else if (bio < 4) {
      bioerror = errorNombre();
    }
    if (lastName === 0) {
      lastNameError = false;
    } else if (!values.lastName.match(letters) || lastName < 4) {
      lastNameError = errorApelli();
    }

    if (tlf === 0) {
      tlfError = false;
    } else if (tlf < 11) {
      tlfError = errorTelef();
    }

    if (lastNameError || nameError || tlfError || bioerror) {
      setErrors({
        nameError,
        lastNameError,
        tlfError,
        bioerror,
      });
      return false;
    } else if (!tlf && !name && !lastName && !bio) {
      window.alert("Debe realizar al menos un cambio");
      return false;
    } else {
      setErrors({
        nameError,
        lastNameError,
        tlfError,
        bioerror,
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
      cpassword = errorApelli();
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
    if (values.bio !== "") {
      await db.collection("users").doc(auth.currentUser.uid).update({
        bio: values.bio,
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
            let biod = doc.data().bio;
            let img = doc.data().img;

            setdisplay({
              firstNamed,
              lastNamed,
              emaild,
              genderd,
              phoneNumberd,
              biod,
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

                updateProfile(auth.currentUser, {
                  displayName: firstNamed + " " + lastNamed,
                  phoneNumber: phoneNumberd,
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
            let biod = doc.data().bio;
            let img = doc.data().img;

            setdisplay({
              firstNamed,
              lastNamed,
              emaild,
              genderd,
              phoneNumberd,
              biod,
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
        <div>
          <h2 className="newUserTitle">Información actual</h2>
        </div>
        <div className="divTexto1">
          <h2 className="newUserTitle">Configure sus datos</h2>
        </div>
        
      </div>
      <br />
      <div className="ContenedorTODO">
        <div className="Contenedor">
          <div className="newUserItem">
            <img
              src={display.img}
              alt="fotico"
              height="100"
              width="100"
              className="perfilpic"
            />
          </div>
          <div>
            <input
              hidden
              type="file"
              id="imgInput"
              accept=".png,.jpg"
              onChange={handlePicChange}
            />
            <br />
            <Tooltip title="Edite su foto de perfil" placement="right">
              <IconButton onClick={handleEditPic}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="newUserItem">
            <lable>Nombre actual:</lable>
            {display.firstNamed}
          </div>
          <br />
          <div className="newUserItem">
            <lable>Apellido actual:</lable>
            {display.lastNamed}
          </div>
          <br />
          <div className="newUserItem">
            <lable>email:</lable>
            {display.emaild}
          </div>
          <br />
          <div className="newUserItem">
            <lable>numero actual:</lable>
            {display.phoneNumberd}
          </div>
          <br />
          <div className="newUserItem">
            <lable>genero:</lable>
            {display.genderd}
          </div>
          <div className="newUserItem">
            <lable>Bio:</lable>
            {display.biod}
          </div>
        </div>
        <br />
        <br />

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
              <label>Bio</label>
              <input
                name="bio"
                type="text"
                placeholder={display.biod}
                variant="filled"
                value={values.bio}
                onChange={handleOnChange}
              />
              <div className="error">{errors.bioerror}</div>
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
         
          <h2 className="newUserTitle"> Cambie su contraseña</h2>
        
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
      </div>
    </div>
  );
};

export default Profile;
