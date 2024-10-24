import React from 'react';
import styles from './Reservas.module.css';

const mockReservations = [
  {
    id: 1,
    hotelName: 'Hotel Las Estrellas',
    date: '2024-10-25',
    status: 'Confirmada'
  },
  {
    id: 2,
    hotelName: 'Resort Paraíso',
    date: '2024-11-05',
    status: 'Pendiente'
  },
  {
    id: 3,
    hotelName: 'Hotel Montaña Azul',
    date: '2024-12-01',
    status: 'Cancelada'
  }
];

const Reservas = () => {
  return (
    <div className={styles.reservationsContainer}>
      <h1 className={styles.heading}>Mis Reservas</h1>

      {mockReservations.length === 0 ? (
        <p className={styles.noReservations}>No tienes reservas en este momento.</p>
      ) : (
        <div className={styles.reservationList}>
          {mockReservations.map((reservation) => (
            <div key={reservation.id} className={styles.reservationCard}>
              <h2 className={styles.hotelName}>{reservation.hotelName}</h2>
              <p className={styles.reservationDate}>Fecha: {reservation.date}</p>
              <p className={`${styles.reservationStatus} ${styles[reservation.status.toLowerCase()]}`}>
                Estado: {reservation.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservas;
