import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AgendarCita.css";
import { auth, db } from "../../../../utils/firebaseApp";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";
import { Pagoexitoso, PagoCancelado, PagoMal } from "../../Icon";
import { Button } from "@material-ui/core";

function AgendarCita() {
  const history = useHistory();
  const [fechaSeleccionada, cambiarFecha] = useState(new Date());
  const [values, setValues] = useState({
    psiconame: "",
    psicolastname: "",
    psicoid: "",
    date: "",
    time: "",
    pago: "done",
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
    if (values.asunto === "" || values.asunto.length < 3) {
      return false;
    }
    if (values.descripcion === "" || values.descripcion.length < 3) {
      return false;
    }
    if (values.date === "") {
      return false;
    }
    if (values.time === "") {
      return false;
    } else {
      return true;
    }
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
        status: values.status,
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
        status: values.status,
      })
      .catch((error) => {
        console.error();
      });
  };
  const handlecita = () => {
    const isvalid = validate();
    if (isvalid) {
      try {
        crear_cita_user();
        crear_cita_psico();
      } catch (error) {}
    } else {
      window.alert("Alguno de sus datos esta incompleto o no es aceptable");
    }
  };

  const paypalConf = {
    currency: "USD",
    env: "sandbox",
    client: {
      sandbox:
        "AYzvDF3dAHirlR1fNpr58mqVlLZYXLApfdth1tKg6OIH_gn58d5YtHpNRTM_xZutXD1n2zpvXVqpx2Hv",
      production: "--id--",
    },
    style: {
      lable: "pay",
      size: "medium",
      shape: "pill",
      color: "gold",
    },
  };
  const PayPalButton = paypal.Button.driver("react", { React, ReactDOM });
  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: "20",
            currency: paypalConf.currency,
          },
          description: "Pago de cita!",
        },
      ],
    };
    return actions.payment.create({ payment });
  };

  const onAuthorize = (data, actions) => {
    const isvalid = validate();
    if (isvalid) {
      try {
        return actions.payment
          .execute()
          .then((response) => {
            console.log(response);
            crear_cita_user();
            crear_cita_psico();
            Pagoexitoso();
          })
          .catch((error) => {
            console.log(error);
            PagoMal();
          });
      } catch (error) {}
    } else {
      window.alert("Alguno de sus datos esta incompleto o no es aceptable");
      PagoMal();
    }
  };

  const onError = (error) => {
    console.log(error);
    PagoMal();
  };
  const onCancel = (data, actions) => {
    PagoCancelado();
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
        <p className="p">20$</p>
        <br />
        <br />
        <PayPalButton
          env={paypalConf.env}
          client={paypalConf.client}
          payment={(data, actions) => payment(data, actions)}
          onAuthorize={(data, actions) => onAuthorize(data, actions)}
          onCancel={(data, actions) => onCancel(data, actions)}
          onError={(error) => onError(error)}
          style={paypalConf.style}
          commit
          locale="es_MX"
        />
      </div>
    </div>
  );
}
export default AgendarCita;
