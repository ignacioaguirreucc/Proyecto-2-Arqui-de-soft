import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

const Home = ({ searchTerm, checkInDate, checkOutDate, onSearch }) => {
  const [hotels, setHotels] = useState([]);
  const [searchInput, setSearchInput] = useState(searchTerm || '');
  const [checkIn, setCheckIn] = useState(checkInDate || '');
  const [checkOut, setCheckOut] = useState(checkOutDate || '');

  const mockHotels = [
    {
      id: 1,
      name: "Hotel Las Estrellas",
      description: "Hotel con vista al mar y habitaciones de lujo.",
      rating: 4.5,
      image: require("../img/vistaalmar.jpg")
    },
    {
      id: 2,
      name: "Hotel Vista Sol",
      description: "Hotel all-inclusive con todas las comodidades.",
      rating: 4.0,
      image: require("../img/allinclusive.jpg")
    },
    {
      id: 3,
      name: "Hotel Montaña Azul",
      description: "Rodeado de montañas, ideal para relajarse.",
      rating: 4.7,
      image: require("../img/hotelmontañas.jpg")
    },
    {
      id: 4,
      name: "Hotel Ciudad Moderna",
      description: "En pleno centro, perfecto para viajes de negocios.",
      rating: 4.2,
      image: require("../img/centrohotel.jpg")
    },
    {
      id: 5,
      name: "Resort Paraíso",
      description: "Resort en el Caribe con playa privada.",
      rating: 4.9,
      image: require("../img/caribe.jpg")
    },
    {
      id: 6,
      name: "Hotel Familiar Sierra",
      description: "Perfecto para familias, con actividades para niños.",
      rating: 4.3,
      image: require("../img/sierrashotel.jpg")
    }
  ];

  const filterHotels = (term, checkIn, checkOut) => {
    return mockHotels.filter((hotel) => {
      const isNameOrDescriptionMatch =
        (hotel.name.toLowerCase().includes((term || '').toLowerCase()) ||
         hotel.description.toLowerCase().includes((term || '').toLowerCase()));

      return isNameOrDescriptionMatch;
    });
  };

  // Actualizar hoteles al hacer clic en el botón "Buscar"
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredHotels = filterHotels(searchInput, checkIn, checkOut);
    setHotels(filteredHotels);
    onSearch(searchInput, checkIn, checkOut); // Llamada al backend o actualización de estado global si es necesario
  };

  useEffect(() => {
    setHotels(mockHotels); // Mostrar todos los hoteles por defecto
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.heroSection}>
        <h1>Descubre Hoteles Increíbles en Todo el Mundo</h1>
        <p>Planea tu próximo viaje con las mejores opciones de alojamiento.</p>
      </div>

      {/* Barra de búsqueda minimalista y centrada */}
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <div className={styles.searchGroup}>
          <input 
            type="text" 
            placeholder="Buscar hotel..." 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} 
            className={styles.searchInput}
          />
          <input 
            type="date" 
            placeholder="Entrada" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={styles.dateInput}
            min={new Date().toISOString().split("T")[0]} // Evita fechas pasadas
          />
          <input 
            type="date" 
            placeholder="Salida" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={styles.dateInput}
            min={checkIn || new Date().toISOString().split("T")[0]} // Evita fechas anteriores a la de entrada
          />
          <button type="submit" className={styles.searchButton}>Buscar</button>
        </div>
      </form>

      {/* Lista de hoteles */}
      <div className={styles.hotelsList}>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCard}>
              <img src={hotel.image} alt={hotel.name} className={styles.hotelImage} />
              <div className={styles.hotelInfo}>
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <p>Rating: {hotel.rating}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron hoteles disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
