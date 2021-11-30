    
    import React, { useEffect, useState } from "react";
    import { db, auth, storage } from "../../../../utils/firebaseApp";
    import firebase from "firebase/compat/app";
    import { updateProfile } from "firebase/auth";
    import './Infogene.css';
    import {
      errorNombre,
      errorContra,
      errorApelli,
      errorTelef,
      errorContraInv,
      Timer2,
    } from "../../Icon";
    import IconButton from "@material-ui/core/IconButton";
    import EditIcon from "@material-ui/icons/Edit";
    import { Tooltip } from "@material-ui/core";
    
    const Infopsico = () => {
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
                    let photoUrl = doc.data().img;
    
                    updateProfile(auth.currentUser, {
                      displayName: firstNamed + " " + lastNamed,
                      phoneNumber: phoneNumberd,
                      photoURL: photoUrl,
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
    return(
    <div className="Contenedor">
          <div className="newUserItem">
            <img
              src={display.img}
              alt="fotico"
              height="200"
              width="200"
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
        );
    };
    export default Infopsico;