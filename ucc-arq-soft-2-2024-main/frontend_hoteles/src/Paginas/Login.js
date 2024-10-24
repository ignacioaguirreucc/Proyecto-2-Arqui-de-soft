import React, { useState } from 'react';
import axios from '../axiosConfig'; // Usa la configuración de axios con el backend
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; 
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
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
      const response = await axios.post('/login', {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);  // Almacena el token JWT
      setMessage('Inicio de sesión exitoso.');  // Mensaje de éxito
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('El usuario no existe o la contraseña es incorrecta.');  // Mensaje si el usuario no existe
      } else {
        setMessage('Error al iniciar sesión: ' + (error.response?.data?.error || 'Ocurrió un error'));
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles['form-box']}>
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
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
            <button type="submit">Iniciar Sesión</button>
            {message && <p className={styles.message}>{message}</p>}  {/* Muestra el mensaje */}
          </form>
          <div className={styles['register-link']}>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
