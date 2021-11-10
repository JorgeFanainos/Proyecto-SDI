import React from "react";
import Carta from "./Carta";

function Buscador({ filteredPersons }) {
  const filtered = filteredPersons.map((person) => (
    <Carta key={person.id} person={person} />
  ));
  return <div>{filtered}</div>;
}

export default Buscador;
