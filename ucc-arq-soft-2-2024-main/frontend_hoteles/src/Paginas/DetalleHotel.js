import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalleHotel.module.css';

const mockHotels = [
    {
      id: 1,
      name: 'Hotel Las Estrellas',
      description: 'Hotel con vista al mar y habitaciones de lujo.',
      rating: 4.5,
      image: require('../img/vistaalmar.jpg'),
      amenities: 'Wifi gratuito, Piscina infinita, Spa, Restaurante gourmet, Desayuno buffet incluido, Bar en la azotea.',
      rooms: 'Habitaciones deluxe con vista al mar, Suites nupciales, Habitaciones estándar con balcón.',
      location: 'Ubicado frente a la playa, a 5 minutos del puerto y a 15 minutos del centro de la ciudad.',
      policies: 'Cancelación gratuita hasta 48 horas antes de la llegada. Check-in a partir de las 15:00, check-out antes de las 12:00.'
    },
    {
      id: 2,
      name: 'Hotel Vista Sol',
      description: 'Hotel all-inclusive con todas las comodidades.',
      rating: 4.0,
      image: require('../img/allinclusive.jpg'),
      amenities: 'Wifi gratuito, Piscina, Buffet internacional, Club nocturno, Animación en vivo, Todo incluido 24 horas.',
      rooms: 'Habitaciones estándar, Habitaciones con acceso directo a la piscina, Suites familiares.',
      location: 'Situado en una playa privada, a 20 minutos en coche del aeropuerto y 10 minutos del centro comercial local.',
      policies: 'Cancelación gratuita hasta 72 horas antes de la llegada. Check-in a partir de las 14:00, check-out antes de las 11:00.'
    },
    {
      id: 3,
      name: 'Hotel Montaña Azul',
      description: 'Rodeado de montañas, ideal para relajarse.',
      rating: 4.7,
      image: require('../img/hotelmontañas.jpg'),
      amenities: 'Wifi en áreas comunes, Senderos naturales, Spa con vista panorámica, Restaurante con ingredientes locales, Actividades al aire libre.',
      rooms: 'Cabañas de lujo con chimenea, Habitaciones estándar con vista a la montaña, Suites con jacuzzi.',
      location: 'En un valle rodeado de naturaleza, a 30 minutos de la reserva natural y a 1 hora del centro urbano más cercano.',
      policies: 'Cancelación gratuita hasta 5 días antes de la llegada. Check-in a partir de las 13:00, check-out antes de las 10:00.'
    },
    {
      id: 4,
      name: 'Resort Paraíso',
      description: 'Resort en el Caribe con playa privada.',
      rating: 4.9,
      image: require('../img/caribe.jpg'),
      amenities: 'Wifi gratuito en todas las áreas, Piscina privada en cada villa, Deportes acuáticos, Spa, Cocina internacional y local, Playa privada con tumbonas.',
      rooms: 'Villas privadas, Suites con terraza privada, Habitaciones de lujo con acceso directo a la playa.',
      location: 'Ubicado en una isla privada, a 40 minutos en barco del puerto más cercano.',
      policies: 'Cancelación gratuita hasta 7 días antes de la llegada. Check-in a partir de las 16:00, check-out antes de las 12:00.'
    },
    {
      id: 5,
      name: 'Hotel Ciudad Moderna',
      description: 'En pleno centro, perfecto para viajes de negocios.',
      rating: 4.2,
      image: require('../img/centrohotel.jpg'),
      amenities: 'Wifi de alta velocidad, Centro de negocios 24 horas, Gimnasio, Restaurante ejecutivo, Salas de reuniones y conferencias, Servicio de traslado al aeropuerto.',
      rooms: 'Habitaciones ejecutivas, Suites de negocios, Habitaciones estándar.',
      location: 'En pleno distrito financiero, a 5 minutos caminando de oficinas corporativas y 10 minutos del aeropuerto.',
      policies: 'Cancelación gratuita hasta 24 horas antes de la llegada. Check-in a partir de las 14:00, check-out antes de las 11:00.'
    },
    {
      id: 6,
      name: 'Hotel Familiar Sierra',
      description: 'Perfecto para familias, con actividades para niños.',
      rating: 4.3,
      image: require('../img/sierrashotel.jpg'),
      amenities: 'Club infantil, Parque acuático, Wifi gratuito, Actividades recreativas, Restaurante buffet, Servicio de niñera.',
      rooms: 'Habitaciones familiares, Suites comunicadas, Habitaciones con vista al jardín.',
      location: 'Ubicado en la sierra, a 15 minutos del centro del pueblo y a 30 minutos de rutas de senderismo.',
      policies: 'Cancelación gratuita hasta 48 horas antes de la llegada. Check-in a partir de las 14:00, check-out antes de las 12:00.'
    }
  ];
  

const DetalleHotel = () => {
    const { id } = useParams();
    const hotel = mockHotels.find((hotel) => hotel.id === parseInt(id));
  
    if (!hotel) {
      return <div>Hotel no encontrado</div>;
    }
  
    return (
      <div className={styles.detailContainer}>
        <h1>{hotel.name}</h1>
        <div className={styles.detailContent}>
          <img src={hotel.image} alt={hotel.name} className={styles.hotelImage} />
          <div className={styles.hotelInfo}>
            <p className={styles.hotelDescription}>{hotel.description}</p>
  
            <p className={styles.hotelAmenities}>
              <strong>Amenities:</strong> {hotel.amenities}
            </p>
            <p className={styles.hotelRooms}>
              <strong>Tipos de habitaciones:</strong> {hotel.rooms}
            </p>
            <p className={styles.hotelLocation}>
              <strong>Ubicación:</strong> {hotel.location}
            </p>
            <p className={styles.hotelPolicies}>
              <strong>Políticas:</strong> {hotel.policies}
            </p>
            <p className={styles.hotelRating}>Puntuación: {hotel.rating} / 5</p>
  
            <button className={styles.bookButton} onClick={() => handleReservation(hotel.id)}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const handleReservation = (hotelId) => {
    alert(`Reserva realizada para el hotel con ID: ${hotelId}`);
  };
  
  export default DetalleHotel;