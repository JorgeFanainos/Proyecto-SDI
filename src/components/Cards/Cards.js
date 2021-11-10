import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Conoce a nuestros Psicólogos!</h1>
      <p>Buscamos a los mejores psicólogos para ayudarte! </p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Descripcion del Psicologo'
              label='Precio de consulta:'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Descripción del Psicólogo'
              label='Precio de consulta:'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Descripción del Psicólogo'
              label='Precio de consulta:'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Descripción del Psicólogo'
              label='Precio de consulta:'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Descripción del Psicólogo'
              label='Precio de consulta:'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
