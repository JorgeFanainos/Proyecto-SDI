import React from "react";
import "./tarjetapsico.css";

const TarjetaPsico = (props) => {
  return (
    <div>
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
          <a className="espInfo-1" title={props.especialista.name}>
            {props.especialista.name}
          </a>
        </div>
        <div>Especialidades:</div>
        <div className="">{props.especialista.especialidad[0]}</div>
        <div className="">{props.especialista.especialidad[1]}</div>
      </div>
    </div>
  );
};

// {/* <div className="choiceEspBox">
// <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
// <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
// </div> */}

export default TarjetaPsico;
