import React from "react";
import { formatRelative } from "date-fns";
import "./Chat.css";

const formatDate = date => {
    let formattedDate = '';
    if (date) {
      // Convert the date in words relative to the current date
      formattedDate = formatRelative(date, new Date());
      // Uppercase the first letter
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };
const  Message =({
    createdAT = null,
    text  = '',
    displayName  = '',
    photoURL  = '',
}) =>  {
    return <ul className="ulContainer">
      {createdAT?.seconds ? (
        <span className="Hora_chat">{formatDate(new Date(createdAT.seconds * 1000))}</span>
      ) : null}
      
      <li className="Texto_chat">{text}</li>
      
      </ul>
}
export default Message;