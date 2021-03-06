import React from "react";
import { db, storage, auth } from "../../../utils/firebaseApp";
import PsicologoCard from "./PsicologoCard";
import { useState, useEffect } from "react";
import "./Admin.css";
import { useHistory } from "react-router-dom";


const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [psicologos, setPsicologos] = useState({});
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  async function getEspecialistas() {
    try {
      setLoading(true);
      const usersRef = db.collection("users");
      const users = await usersRef.get();
      let especialistaDocs = {};
      let data;
      let docId;
      users.forEach((doc) => {
        data = doc.data();
        docId = doc.id;
        if (data.rol === "psicologo" && data.status === "standby") {
          especialistaDocs[docId] = data;
          especialistaDocs[docId]["id"] = docId;
        }
      });

      setPsicologos(especialistaDocs);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getEspecialistas();
  }, [refresh]); //cambios en refresh harán que se llame getEspecialistas

  async function handleAccept(psicologos) {
    try {
      setLoading(true);
      const especialistaDoc = db.collection("users").doc(psicologos.id);
      await especialistaDoc.update({ status: "aceptado" });
      setRefresh(refresh + 1);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  async function handleReject(psicologos) {
    try {
      setLoading(true);
      const especialistaDoc = db.collection("users").doc(psicologos.id);
      await especialistaDoc.update({ status: "rechazado" });
      setRefresh(refresh + 1);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  async function openCredentials(psicologos) {
    try {
      const storageRef = storage.ref("credentials/" + psicologos.id);
      const url = await storageRef.getDownloadURL();
      window.open(url); //se abre el archivo de credenciales del especialista en otra pestaña
    } catch (err) {
      setError(err);
    }
  }

  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  return (
    <>
      <section className="admin">
        <div className="titulo">¡Bienvenido administrador!</div>
        <div className="containerEspecialistasAdmin">
          <br/>
          <div className="parrafo">
            <p className="introAdmin">
              Se le presentarán los candidatos postulados, considere su decisión.   
            </p>
          </div><br/>
          {
            //si está cargando, muestra "Cargando..."; si no: si hay un error muestra el mensaje de error;
            //si no: si hay especialistas que mostrar se muestran y si no, muestra "No hay especialistas nuevos."
            loading && !error ? (
              <h1>loading</h1>
            ) : error ? (
              <div className="altText">
                <br/>
                Error: {error.message}. <br/>
                <span className="refreshLink" onClick={() => setError(false)}>
                  Intente refrescar la página.
                </span>
              </div>
            ) : Object.entries(psicologos).length !== 0 ? (
              <div className="especialistaList">
                {Object.keys(psicologos).map((key) => {
                  const especialista = psicologos[key];
                  return (
                    <PsicologoCard
                      key={especialista.id}
                      especialista={especialista}
                      handleAccept={handleAccept}
                      handleReject={handleReject}
                      handleCredentials={openCredentials}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="altText">
                No hay psicologos nuevos. <br></br>
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
      </section>
    </>
  );
};

export default Admin;
