import React from 'react';
import { useLocation } from 'react-router-dom';

const MeteoSpecifico = () => {
  const location = useLocation();
  const { cityData } = location.state;

  if (!cityData) {
    return <div className="container-fluid">Errore: Dati della città non disponibili</div>;
  }


  const convertKelvinToCelsius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(2);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card custom-card text-center p-4">
        <h1 className="card-title">{cityData.name}</h1>
        <div className="card-body">
          <p>Temperatura: {convertKelvinToCelsius(cityData.main.temp)} °C</p>
          <p>Pressione: {cityData.main.pressure} hPa</p>
          <p>Umidità: {cityData.main.humidity}%</p>
          <p>Tempo: {cityData.weather[0].main}</p>
          <p>Descrizione: {cityData.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default MeteoSpecifico;