import React, { useState, useEffect } from "react";
import { db } from "../../../utils/firebaseApp";
import Buscador from "./BuscadorPsico";
import "./Buscar.css";
import Sidebar from "../Perfiles/componentesperfiles/Sidebar";

function BuscarPsicologo() {
  const [values, setValues] = useState({
    search: "",
    especialidad: "",
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

  async function getHistoriales() {
    if (values.search === "" && values.especialidad === "") {
      try {
        setLoading(true);
        const histRef = db.collection("users");
        await histRef;
        const historias = await histRef.get();

        let docsHistorias = {};
        let data;
        let docId;
        historias.forEach((doc) => {
          data = doc.data();
          docId = doc.id;
          if (data.rol === "psicologo" && data.status === "aceptado") {
            docsHistorias[docId] = data;
            docsHistorias[docId]["id"] = docId;
          }
        });

        setHistorias(docsHistorias);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    } else if (values.search !== "" && values.especialidad === "") {
      try {
        setLoading(true);
        const histRef = db
          .collection("users")
          .where("name", ">=", values.search)
          .where("name", "<=", values.search + "\uf8ff")
          .get();
        await histRef;
        console.log(histRef);
        let docsHistorias = {};
        let data;
        let docId;
        (await histRef).forEach((doc) => {
          data = doc.data();
          console.log(data);
          docId = doc.id;
          if (data.rol === "psicologo" && data.status === "aceptado") {
            docsHistorias[docId] = data;
            docsHistorias[docId]["id"] = docId;
          }
        });

        setHistorias(docsHistorias);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    } else if (values.especialidad !== "" && values.search === "") {
      try {
        setLoading(true);
        const histRef = db
          .collection("users")
          .where("especialidad", "array-contains", values.especialidad)
          .get();
        await histRef;

        let docsHistorias = {};
        let data;
        let docId;
        (await histRef).forEach((doc) => {
          data = doc.data();
          docId = doc.id;
          if (data.rol === "psicologo" && data.status === "aceptado") {
            docsHistorias[docId] = data;
            docsHistorias[docId]["id"] = docId;
          }
        });

        setHistorias(docsHistorias);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    } else if (values.especialidad !== "" && values.search !== "") {
      try {
        setLoading(true);
        const histRef = db
          .collection("users")
          .where("especialidad", "array-contains", values.especialidad)
          .get();

        let docsHistorias = {};
        let data;
        let docId;
        (await histRef).forEach((doc) => {
          data = doc.data();
          docId = doc.id;
          if (
            data.rol === "psicologo" &&
            data.status === "aceptado" &&
            data.name === values.search
          ) {
            docsHistorias[docId] = data;
            docsHistorias[docId]["id"] = docId;
          }
        });

        setHistorias(docsHistorias);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    values.especialidad = "";
  }

  useEffect(() => {
    getHistoriales();
  }, [refresh]);

  return (
    <div className="ContenedorTodo">
      <div className="ContenedorSidebar">
        <Sidebar />
      </div>

      <div className="containerPsicologos">
        <p className="introAdmin">
          ¿Conoces a tu especialista? Buscalo por nombre &nbsp;&nbsp;
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
        <br />
        <br />

        <label>Busque por especialidad &nbsp; </label>
        <select
          id="select"
          name="especialidad"
          value={values.especialidad}
          onChange={handleOnChange}
        >
          <option defaultValue=""> </option>
          <option value="pareja">Terapia de Pareja</option>
          <option value="autoestima">Terapia de autoestima</option>
          <option value="ansiedad">Terapia de ansiedad</option>
          <option value="conductual">Terapia conductual</option>
        </select>
        <button onClick={getHistoriales}>Search</button>

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
            <div>
              <Buscador histfilt={historias} />
            </div>
          ) : (
            <div className="altText">
              No hay psicologos. <br></br>
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
}

export default BuscarPsicologo;
