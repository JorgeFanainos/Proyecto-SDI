import React, {useState} from "react";
import reactRouterDom from "react-router-dom";
import{ MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import "./AgendarCita.css";
import { Link } from 'react-router-dom';

function AgendarCita(){
    const [fechaSeleccionada, cambiarFecha]= useState(new Date())
    return(
       <div className="contenedorTodo">
          <div className="contenedorTexto">
            <div>
                <h1 className="textos">Asunto De la Cita:</h1>
                <textarea className="asunto" placeholder="Introduzca el asunto de la cita"></textarea>
            </div>
            <div>
                <h1 className="textos">Descripción:</h1>
                <textarea className="descripcion" placeholder="Porque desea la cita?"></textarea>
            </div>
          </div> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="contenedor">
                    <div className="horario">
                        <lable className="textos">Fecha</lable>
                        <DatePicker value={fechaSeleccionada} onChange={cambiarFecha}/>
                    </div>
                    <div className="horario">
                        <lable className="textos">Hora</lable>
                        <TimePicker value={fechaSeleccionada} onChange={cambiarFecha}/>
                    </div>
                    <br/>
                    <br/>
                        <p>Precio de la Consulta</p>
                    <br/>
                    <br/>
                    <Link  className="Pasarela" to='/pasarela'>Pagar</Link>
                </div>  
            </MuiPickersUtilsProvider>
            
        </div> 
    )

}
export default AgendarCita;  
