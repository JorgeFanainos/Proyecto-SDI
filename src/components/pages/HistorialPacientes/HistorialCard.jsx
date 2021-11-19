import React from "react";
import "./historialcards.css";

const PsicologoCard = (props) => {
  return (
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
          onClick={() => {
            props.handleEdit(props.historiales);
          }}
        ></button>
        <button
          type="button"
          className="rechazarEsp"
          title="Click para rechazar al especialista."
          onClick={() => {
            props.handleReject(props.historiales);
          }}
        ></button>
      </div>
    </div>
  );
};

export default PsicologoCard;
