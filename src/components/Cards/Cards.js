import React from "react";
import "./Cards.css";
import BuscarPsicologoHome from "../BuscarPsicoHome/BuscarPsicologosHome";

function Cards() {
  return (
    <div>
      <div className="cards">
        <h1>Conoce a nuestros Psicólogos!</h1>
        <p>Buscamos a los mejores psicólogos para ayudarte! </p>
      </div>
      <div className="buscador">
        <BuscarPsicologoHome />
      </div>
    </div>
  );
}

export default Cards;
