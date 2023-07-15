import React, { useState } from 'react';


const ReservacionHoteles = () => {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [hotelesFiltrados, setHotelesFiltrados] = useState([]);

  const cargarHoteles = async () => {
    try {
      const response = await fetch('/data/hoteles.json');
      const data = await response.json();
      const { hoteles } = data;
      const hotelesFiltrados = hoteles.filter((hotel) => hotel.ciudad === ciudadSeleccionada);
      setHotelesFiltrados(hotelesFiltrados);
    } catch (error) {
      console.error('Error al cargar los hoteles', error);
    }
  };

  const handleCiudadChange = (event) => {
    setCiudadSeleccionada(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cargarHoteles();
  };

  return (
    <div className='container'>
      <h1>Reservación de Hoteles por Ciudad</h1>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={ciudadSeleccionada} onChange={handleCiudadChange} />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {hotelesFiltrados.length > 0 ? (
        <div>
          <h2>Hoteles disponibles en {ciudadSeleccionada}:</h2>
          <ul>
            {hotelesFiltrados.map((hotel, index) => (
              <li key={index}>{hotel.nombre}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron hoteles en {ciudadSeleccionada}.</p>
      )}
    </div>
  );
};

export default ReservacionHoteles;
