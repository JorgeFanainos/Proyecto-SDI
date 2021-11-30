import "./Hero.css";
import { DataGrid, gridColumnLookupSelector } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, auth } from "../../../../utils/firebaseApp";
import Sidebar from "../componentesperfiles/Sidebar";
import { render } from "react-dom";

export default function Hero() {
  const [refresh, setRefresh] = useState(0);
  const [values, setValues] = useState({
    listacitas: [],
  });
  const [order, setOrder] = useState("ASC");

  async function getCitas() {
    try {
      const citasref = await db.collection(
        `users/${auth.currentUser.uid}/citas`
      );

      const citas = await citasref.get();
      citas.forEach((doc) => {
        var data = doc.data();

        values.listacitas.push(data);
      });
    } catch (e) {
      console.log(e);
    }
  }
  console.log(values.listacitas);

  useEffect(() => {
    getCitas();
  }, [refresh]);

  return (
    <div className="container">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      ></link>
      <div className="sidebarcitas1">
      <Sidebar />
      </div>
      <div className="table">
        <table class="table table-bordered">
          <thead>
            <th class="text-center"> Nombre del Especialista </th>
            <th class="text-center"> Fecha de Cita </th>
            <th class="text-center"> Hora de Cita </th>
            <th class="text-center"> Asunto de Cita </th>
          </thead>
          <tbody id="tbody1">
            {" "}
            {values.listacitas.map((data) => {
              return (
                <tr>
                  <td class="text-center">{data.name}</td>
                  <td class="text-center">{data.date}</td>
                  <td class="text-center">{data.time}</td>
                  <td class="text-center">{data.asunto}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
