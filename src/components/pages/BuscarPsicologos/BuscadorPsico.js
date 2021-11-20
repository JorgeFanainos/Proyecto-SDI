import React from "react";
import TarjetaPsico from "./TarjetaPsico";

function Buscador({ histfilt }) {
  const filtrados = Object.keys(histfilt).map((key) => {
    const historiales = histfilt[key];
    return (
      <div>
        <TarjetaPsico key={historiales.id} especialista={historiales} />
      </div>
    );
  });
  return <div className="especialistaList">{filtrados}</div>;
}

export default Buscador;
