import React from "react";
import { formatRelative } from "date-fns";
import { db, auth } from "../../../../utils/firebaseApp";

const FormaDeNota = ({ text = "", username = "", photoURL = "" }) => {
  return (
    <ul className="partefeed1">
      <li className="Nombre_user">{username}</li>
      <li className="Texto_chat1">- {text}</li>
    </ul>
  );
};
export default FormaDeNota;
