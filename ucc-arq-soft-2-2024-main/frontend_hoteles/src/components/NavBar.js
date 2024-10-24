import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlinks}>
        <li><Link to="/">Hogar</Link></li>
        <li><Link to="/hoteles">Resultados</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/registro">Registro</Link></li>
        <li><Link to="/mis-reservas">Mis Reservas</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
