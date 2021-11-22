import React from "react";
import "./historialcards.css";
import firebase from "firebase/compat/app";
import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { db, auth } from "../../../utils/firebaseApp";
const HistorialCards = (props) => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    nombre1: "",
    info1: "",
    email1: "",
    tlf1: "",
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };
  const validateUpdate = async () => {
    if (values.nombre1 !== "") {
      await db
        .collection(`users/${auth.currentUser.uid}/historias`)
        .doc(props.historiales.id)
        .update({
          name: values.nombre1,
        });
    }
    if (values.email1 !== "") {
      await db
        .collection(`users/${auth.currentUser.uid}/historias`)
        .doc(props.historiales.id)
        .update({
          email: values.email1,
        });
    }
    if (values.tlf1 !== "") {
      await db
        .collection(`users/${auth.currentUser.uid}/historias`)
        .doc(props.historiales.id)
        .update({
          phoneNumber: values.tlf1,
        });
    }
    if (values.info1 !== "") {
      await db
        .collection(`users/${auth.currentUser.uid}/historias`)
        .doc(props.historiales.id)
        .update({
          info: values.info1,
        });
    }
    await db
      .collection(`users/${auth.currentUser.uid}/historias`)
      .doc(props.historiales.id)
      .update({
        date: Date(
          firebase.firestore.FieldValue.serverTimestamp().seconds * 1000
        ),
      });
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleEdit = async () => {
    validateUpdate();
    handleClose();
    await delay(2000);

    props.Refresh();
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="especialistaCard">
        <div className="espCardTop"></div>
        <div className="espBox">
          <div className="espBoxCategory">Nombre</div>
          <p className="espInfo" title={props.historiales.name}>
            {props.historiales.name}
          </p>
        </div>
        <div className="espBox">
          <div className="espBoxCategory">Correo</div>
          <p className="espInfo" title={props.historiales.email}>
            {props.historiales.email}
          </p>
        </div>
        <div className="choiceEspBox">
          <button
            type="button"
            className="aceptarEsp"
            title="Click para aceptar al especialista."
            onClick={handleClickOpen}
          >
            {" "}
            Editar
          </button>
          <button
            type="button"
            className="rechazarEsp"
            title="Click para rechazar al especialista."
            onClick={() => {
              props.handleReject(props.historiales);
            }}
          >
            {" "}
            Eliminar
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Historial del Paciente</DialogTitle>
        <DialogContent>
          <DialogContentText>Edite el Contenido</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="nombre1"
            label={props.historiales.name}
            type="textarea"
            onChange={handleOnChange}
            value={values.nombre1}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email1"
            label={props.historiales.email}
            type="email"
            value={values.email1}
            onChange={handleOnChange}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="tlf"
            name="tlf"
            label={props.historiales.phoneNumber}
            type="textarea"
            value={values.tlf}
            onChange={handleOnChange}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            label="Ultima fecha de modificacion"
            type="textarea"
            value={props.historiales.date}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="historial"
            name="info1"
            label={props.historiales.info}
            type="textarea"
            value={values.info1}
            onChange={handleOnChange}
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Editar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HistorialCards;
