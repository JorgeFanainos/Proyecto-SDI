import React from "react";
import Search from "./Buscar";
import initialDetails from "./InitailData";

function BuscarPsicologo() {
  return (
    <div className="tc bg-green ma0 pa4 min-vh-100">
      <Search details={initialDetails} />
    </div>
  );
}

export default BuscarPsicologo;
