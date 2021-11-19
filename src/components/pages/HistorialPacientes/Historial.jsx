import React from "react";
import { useState, useEffect } from "react";
import { db, auth, storage } from "../../../utils/firebaseApp";
import firebase from "firebase/compat/app";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "./Historial.css";
import HistorialCards from "./HistorialCard";

import {
  errorNombre,
  errorContra,
  errorApelli,
  errorTelef,
  errorContraInv,
  Timer2,
} from "../Icon";

const Historial = () => {
  const [values, setValues] = useState({
    name: "",
    info: "",
    email: "",
    phoneNumber: "",
    titleButton: "Guardar",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    infoError: "",
  });

  const [loading, setLoading] = useState(true);
  const [historias, setHistorias] = useState({});
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };
  const handleSubmit = async (e) => {
    const histRef = await db.collection(
      `users/${auth.currentUser.uid}/historias`
    );
    e.preventDefault();

    histRef
      .add({
        name: values.name,
        info: values.info,
        email: values.email,
        phoneNumber: values.phoneNumber,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.error();
      });
    setRefresh(refresh + 1);
  };

  async function getHistoriales() {
    try {
      setLoading(true);
      const histRef = db.collection(`users/${auth.currentUser.uid}/historias`);
      await histRef;
      const historias = await histRef.get();
      let docsHistorias = {};
      let data;
      let docId;
      historias.forEach((doc) => {
        data = doc.data();
        docId = doc.id;

        docsHistorias[docId] = data;
        docsHistorias[docId]["id"] = docId;
      });

      setHistorias(docsHistorias);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getHistoriales();
  }, [refresh]);

  async function handleReject(historias) {
    try {
      setLoading(true);
      const docsHistorias = db
        .collection(`users/${auth.currentUser.uid}/historias`)
        .doc(historias.id);
      await docsHistorias.delete();
      setRefresh(refresh + 1);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  const handleEdit = async (id) => {
    console.log("hola");
    // await db
    //   .ref(`users/${auth.currentUser.uid}/historias` + id)
    //   .on("value", (snapshot) => {
    //     const data = snapshot.val();
    //     this.setState({ employee: data.employee, titleButton: "Editar" });
    //   });
  };

  return (
    <div>
      <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Rellene los campos
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={handleOnChange}
                    required
                    id="name"
                    name="name"
                    label="Nombre Completo"
                    fullWidth
                    value={values.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleOnChange}
                    required
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleOnChange}
                    required
                    id="phone"
                    name="phoneNumber"
                    label="Teléfono"
                    fullWidth
                    value={values.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleOnChange}
                    required
                    id="info"
                    name="info"
                    label="Historial"
                    fullWidth
                    value={values.info}
                  />
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                  {" "}
                  {values.titleButton}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <div className="containerEspecialistasAdmin">
        <p className="introAdmin">
          Observe y edite sus historiales de pacientes:
        </p>
        <hr />
        {
          //si está cargando, muestra "Cargando..."; si no: si hay un error muestra el mensaje de error;
          //si no: si hay especialistas que mostrar se muestran y si no, muestra "No hay especialistas nuevos."
          loading && !error ? (
            <h1>loading</h1>
          ) : error ? (
            <div className="altText">
              Error: {error.message}. <br></br>
              <span className="refreshLink" onClick={() => setError(false)}>
                Intente refrescar la página.
              </span>
            </div>
          ) : Object.entries(historias).length !== 0 ? (
            <div className="especialistaList">
              {Object.keys(historias).map((key) => {
                const historiales = historias[key];
                return (
                  <HistorialCards
                    key={historiales.id}
                    historiales={historiales}
                    handleEdit={handleEdit}
                    handleReject={handleReject}
                  />
                );
              })}
            </div>
          ) : (
            <div className="altText">
              No hay historiales. <br></br>
              <span
                className="refreshLink"
                onClick={() => setRefresh(refresh + 1)}
              >
                Intente refrescar la página.
              </span>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Historial;
