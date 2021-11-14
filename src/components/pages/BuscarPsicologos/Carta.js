import React from "react";
import "./Carta.css";

function Carta({ person }) {
  return (
    <div className="contenedorCarta">
      <img className="perfilPsicologo" alt="" src={person.imgPath} />
      <div>
        <h2 className="InfoPsicologo">{person.name}</h2>
        <p className="InfoPsicologo">{person.especialidad}</p>
      </div>
    </div>
  );
}

export default Carta;
