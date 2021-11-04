import React from "react";
import './pagesFooter.css'
import CardItem from '../../CardItem';

function Colaboradores(){
    return(
        <div className="div">
            <h1 className="h1">Colaboradores</h1>
        <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-jeff.jpeg'
              text="I believe you have to be willing to be misunderstood if you're going to innovate.| Bezos"
              label='Colaboración:10.532$'
              path='/colaboradores'
            />
            <CardItem
              src='images/img-jeff.jpeg'
              text='Descripción del Psicólogo'
              label='Colaboración:9.635$'
              path='/colaboradores'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-sins.jpeg'
              text='A well dressed man is more attractive than a shirtless guys with six pack abs.| Sins'
              label='Colaboración:8.634$'
              path='/colaboradores'
            />
            <CardItem
              src='images/img-jeff.jpeg'
              text='Descripción del Psicólogo'
              label='Colaboración:3.254$'
              path='/colaboradores'
            />
            <CardItem
              src='images/img-rayo.png'
              text='Velocidad, soy veloz| McQueen '
              label='Colaboración:1.585$'
              path='/colaboradores'
            />
          </ul>
        </div>
      </div>

        </div>

    )

}
export default Colaboradores;    