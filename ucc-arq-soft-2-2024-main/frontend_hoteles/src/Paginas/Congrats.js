import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Congrats.module.css';

const Congrats = ({ success }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.congratsContainer}>
      <div className={styles.messageBox}>
        {success ? (
          <>
            <h1>🎉 ¡Reserva Exitosa!</h1>
            <p>Tu reserva ha sido confirmada con éxito. Recibirás un correo con los detalles.</p>
          </>
        ) : (
          <>
            <h1>❌ Error en la Reserva</h1>
            <p>Lo sentimos, hubo un problema al procesar tu reserva. Inténtalo de nuevo más tarde.</p>
          </>
        )}
        <button className={styles.homeButton} onClick={handleReturnHome}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Congrats;
