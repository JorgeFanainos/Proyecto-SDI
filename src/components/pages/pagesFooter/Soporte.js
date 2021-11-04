import React, { useState } from "react";
import './pagesFooter.css';
import { mensaje } from "../Icon"; 

function Soporte(){
    return(
        <div className="div">
            <h1 className="h1">Soporte</h1>
            <p>Escriba su mensaje para Soporte</p>
            <textarea className="TextArea" required>
                
            </textarea>
            <button className="btn-formulario" onClick={mensaje}> Enviar mensaje</button>
        </div>

    )

}
export default Soporte;    