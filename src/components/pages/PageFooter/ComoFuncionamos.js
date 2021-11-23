import React from "react";
import './pagesFooter.css';

function comoFuncionamos(){
    return(
        <div className="div">
            <h1 className="h1">Porque me aparece este error?</h1>
            <br/>
            <p className="p">En la siguente se presentara una lista de las razones por las que usted pudo ser rechazado de nuestra plataforma</p>
            <br/>
            <h3 className="h3">1) No cumple con un curriculum adecuado</h3>
            <br/>
            <div className="div">
            <br/>
            <p className="p">Despues de un arduo analisis, hemos decidido que su curriculum no es apto para que pueda presentar sus servicios en nuestra plataforma</p>
            <br/>
            </div>
            <br/>
            <h3 className="h3">2) Los datos que ha ingresado son considerados como sospechozos</h3>
            <br/>
            <div className="div">
            <br/>
            <p className="p">Al revisar sus datos personales, hemos encontrado informacion sospechoza</p>
            <br/>
            </div>
            <br/>
            <h3 className="h3">3) Relleno el form de forma indebida</h3>
            <br/>
            <div className="div">
            <br/>
            <p className="p">Si Usted relleno el formulario correspondiente de forma indebida, intentelo nuevamente para otra oportunidad de registro en nuestra plataforma</p>
            <br/>
            </div>
        </div>

    )

}
export default comoFuncionamos;    