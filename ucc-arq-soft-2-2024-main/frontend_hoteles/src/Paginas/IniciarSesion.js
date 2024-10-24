import React, { useState } from 'react';
import axios from '../axiosConfig'; // Usa la configuración de axios con el backend
import styles from './IniciarSesion.module.css'; 
import { FaUser, FaLock } from "react-icons/fa";

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');  // Estado para el mensaje de éxito o error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users', {
        username: formData.username,
        password: formData.password,
      });
      setMessage('Usuario registrado exitosamente.');  // Mensaje de éxito
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('El nombre de usuario ya está en uso.');  // Mensaje si el usuario ya existe
      } else {
        setMessage('Error al registrar el usuario: ' + (error.response?.data?.error || 'Ocurrió un error'));
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles['form-box']}>
          <form onSubmit={handleSubmit}>
            <h1>Regístrate</h1>
            <div className={styles['input-box']}>
              <input 
                type="text" 
                name="username" 
                placeholder="Usuario" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles['input-box']}>
              <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <FaLock className={styles.icon} />
            </div>
            <button type="submit">Regístrate</button>
            {message && <p className={styles.message}>{message}</p>} {/* Muestra el mensaje */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
