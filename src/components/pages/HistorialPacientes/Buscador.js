import React from "react";
import HistorialCards from "./HistorialCard";

function Buscador({ histfilt, handleReject, Refresh }) {
  const filtrados = Object.keys(histfilt).map((key) => {
    const historiales = histfilt[key];
    return (
      <div>
        <HistorialCards
          key={historiales.id}
          historiales={historiales}
          handleReject={handleReject}
          Refresh={Refresh}
        />
      </div>
    );
  });
  return <div className="especialistaList">{filtrados}</div>;
}

export default Buscador;
