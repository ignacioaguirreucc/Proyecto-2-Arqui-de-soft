import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Paginas/Home";
import Hoteles from './Paginas/Hoteles';
import Login from './Paginas/Login';
import Registro from './Paginas/IniciarSesion';
import MisReservas from './Paginas/Reservas';
import DetalleHotel from './Paginas/DetalleHotel';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSearch = (term, checkIn, checkOut) => {
    setSearchTerm(term);
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
  };

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchTerm={searchTerm}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                onSearch={handleSearch}
              />
            }
          />
          <Route path="/hoteles" element={<Hoteles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/detalle-hotel/:id" element={<DetalleHotel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
