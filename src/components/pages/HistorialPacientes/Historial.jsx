import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../../utils/firebaseApp";
import firebase from "firebase/compat/app";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Historial.css";
import Buscador from "./Buscador";
import { Button, TextField } from "@material-ui/core";

const Historial = () => {
  const [values, setValues] = useState({
    name: "",
    info: "",
    email: "",
    phoneNumber: "",
    titleButton: "Guardar",
    search: "",
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
        date: Date(
          firebase.firestore.FieldValue.serverTimestamp().seconds * 1000
        ),
      })
      .catch((error) => {
        console.error();
      });
    delay(2000);
    setRefresh(refresh + 1);
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const Refresh = () => {
    setRefresh(refresh + 1);
  };

  async function getHistoriales() {
    if (values.search === "") {
      try {
        setLoading(true);
        const histRef = db.collection(
          `users/${auth.currentUser.uid}/historias`
        );
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
    } else if (values.search !== "") {
      try {
        setLoading(true);
        const histRef = db
          .collection(`users/${auth.currentUser.uid}/historias`)
          .where("name", ">=", values.search)
          .where("name", "<=", values.search + "\uf8ff")
          .get();
        await histRef;

        let docsHistorias = {};
        let data;
        let docId;
        (await histRef).forEach((doc) => {
          data = doc.data();
          console.log(data);
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
                    multiline
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
          Observe y edite sus historiales de pacientes: &nbsp;&nbsp;
          <input
            type="text"
            id="search"
            name="search"
            placeholder="ingrese nombre o correo"
            value={values.search}
            onChange={handleOnChange}
          />
          <button onClick={getHistoriales}>Search</button>
        </p>

        <hr />
        {loading && !error ? (
          <h1>loading</h1>
        ) : error ? (
          <div className="altText">
            <br></br>
            <span className="refreshLink" onClick={() => setError(false)}>
              Intente refrescar la página.
            </span>
          </div>
        ) : Object.entries(historias).length !== 0 ? (
          <div>
            <Buscador
              histfilt={historias}
              handleReject={handleReject}
              Refresh={Refresh}
            />
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
        )}
      </div>
    </div>
  );
};

export default Historial;
