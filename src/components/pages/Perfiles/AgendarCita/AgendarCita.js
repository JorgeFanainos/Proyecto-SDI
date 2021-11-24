import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AgendarCita.css";
import { Link } from "react-router-dom";
import { auth, db } from "../../../../utils/firebaseApp";

function AgendarCita() {
  const history = useHistory();
  const [fechaSeleccionada, cambiarFecha] = useState(new Date());
  const [values, setValues] = useState({
    psiconame: "",
    psicolastname: "",
    psicoid: "",
    date: "",
    time: "",
    pago: "standby",
    status: "pending",
    asunto: "",
    descripcion: "",
  });
  values.psiconame = localStorage.getItem("nombre");
  values.psicolastname = localStorage.getItem("lastname");
  values.psicoid = localStorage.getItem("id");

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };
  console.log(values.psiconame, values.psicoid, values.psicolastname);

  const validate = () => {
    return true;
  };

  const crear_cita_user = async () => {
    const citaref = await db.collection(`users/${auth.currentUser.uid}/citas`);

    citaref
      .add({
        name: values.psiconame + " " + values.psicolastname,
        asunto: values.asunto,
        info: values.descripcion,
        date: values.date,
        time: values.time,
        pago: values.pago,
      })
      .catch((error) => {
        console.error();
      });
  };

  const crear_cita_psico = async () => {
    const citaref = await db.collection(`users/${values.psicoid}/citas`);

    citaref
      .add({
        name: auth.currentUser.displayName,
        asunto: values.asunto,
        info: values.descripcion,
        date: values.date,
        time: values.time,
        pago: values.pago,
      })
      .catch((error) => {
        console.error();
      });
  };
  const handlecita1 = () => {
    const isvalid = validate();
    if (isvalid) {
      try {
        crear_cita_user();
        crear_cita_psico();
        history.push("/pasarela");
      } catch (error) {}
    } else {
      window.alert("Alguno de sus datos esta incompleto o no es aceptable");
    }
  };
  return (
    <div className="contenedorTodo">
      <div className="contenedorTexto">
        <div>
          <h1 className="textos">Asunto De la Cita:</h1>
          <textarea
            className="asunto"
            name="asunto"
            placeholder="Introduzca el asunto de la cita"
            value={values.asunto}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div>
          <h1 className="textos">Descripción:</h1>
          <textarea
            className="descripcion"
            name="descripcion"
            placeholder="Porque desea la cita?"
            value={values.descripcion}
            onChange={handleOnChange}
          ></textarea>
        </div>
      </div>
      <div className="contenedor">
        <div className="horario">
          <lable className="textos">Fecha</lable>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleOnChange}
            min="<?= date('Y-m-d'); ?>"
          />
        </div>

        <div className="horario">
          <lable className="textos">Hora</lable>
          <select
            id="cars"
            name="time"
            value={values.time}
            onChange={handleOnChange}
          >
            <option defaultValue=""> </option>
            <option value="9:30 - 12:00">9:30am a 12:00m</option>
            <option value="2:00 - 4:30">2:00pm a 4:30pm</option>
            <option value="4:30 - 7:00">4:30pm a 7:00pm</option>
            <option value="7:00 - 9:30">7:00pm a 9:00pm </option>
          </select>
        </div>
        <br />
        <br />
        <p>Precio de la Consulta</p>
        <br />
        <br />
        <button className="boton" onClick={handlecita1}>
          {" "}
          Pagar
        </button>
      </div>
    </div>
  );
}
export default AgendarCita;
