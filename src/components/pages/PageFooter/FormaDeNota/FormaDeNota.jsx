import React from "react";
import { formatRelative } from "date-fns";


const  FormaDeNota =({
    text  = '',
    displayName  = '',
    photoURL  = '',
}) =>  {
    return <ul className="partefeed">
      
      <li className="Texto_chat1">- {text}</li>
      
      </ul>
}
export default FormaDeNota;