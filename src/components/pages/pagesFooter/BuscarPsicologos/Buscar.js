import React, { useState } from 'react';
import Scroll from './Scroll';
import Buscador from './Buscador';
import './Buscar.css';
import Sidebar from '../../Perfiles/componentesperfiles/Sidebar';

function Search({ details }) {

  const [searchField, setSearchField] = useState("");

  const filteredPersons = details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .especialidad
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <Buscador filteredPersons={filteredPersons} />
      </Scroll>
    );
  }

  return (
    <div className='ContenedorTodo'>
      <div className='ContenedorSidebar'>
        <Sidebar/>
      </div>
      <section className="contenedor">
        <div className="contenedorTexto">
          <h2 className="Texto">Buscador De Psicologos</h2>
        </div>
        <div className="pa2">
          <input 
            className="InputBuscador"
            type = "search" 
            placeholder = "Buscar Psicologo" 
            onChange = {handleChange}
          />
        </div>
        {searchList()}
      </section>
    </div>
  );
}

export default Search;