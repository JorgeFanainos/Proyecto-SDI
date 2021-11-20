import React from "react";
import "./tarjetapsico.css";

const TarjetaEspecialista = (props) => {
  return (
    <div className="especialistaCard-1">
      <div className="espBox-1">
        <div>
          <img
            src={props.especialista.img}
            alt="Not found"
            className="imagen-especialista"
          />
        </div>
        <p className="espInfo-1"></p>
      </div>
      <div className="espBox-1">
        <a
          className="espInfo-1"
          title={props.especialista.name}
          href="/agendarcita"
        >
          {props.especialista.name}
        </a>
      </div>
    </div>
  );
};

// {/* <div className="choiceEspBox">
// <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
// <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
// </div> */}

export default TarjetaEspecialista;
