import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import './SearchBar';

const SearchBar = ({ setWeatherData }) => {
  const [searchCity, setSearchCity] = useState('');
  const [cityWeather, setCityWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchCity(event.target.value);
  };

  const fetchCurrentWeather = async () => {
    const apiKey = '97da70be3c91051aa093be5ea7a21ced';
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=${apiKey}`);
      const data = await response.json();
      if (response.ok) {
        setCityWeather(data);
        setWeatherData(data);
        setError(null);
      } else {
        setError('Città non trovata');
      }
    } catch (error) {
      console.error('Errore durante il recupero dei dati meteorologici:', error);
      setError('Errore durante il recupero dei dati meteorologici');
    }
  };

  const fetchForecastWeather = async (latitude, longitude) => {
    const apiKey = '97da70be3c91051aa093be5ea7a21ced';
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      const data = await response.json();
      if (response.ok) {
        setForecastWeather(data);
      } else {
        setError('Previsioni future non disponibili');
      }
    } catch (error) {
      console.error('Errore durante il recupero delle previsioni future:', error);
      setError('Errore durante il recupero delle previsioni future');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchCity.trim() !== '') {
      setLoading(true); 
      setTimeout(() => {
        fetchCurrentWeather();
        setLoading(false); 
      }, 1200);
    }
  };

  useEffect(() => {
    if (cityWeather && cityWeather.coord) {
      fetchForecastWeather(cityWeather.coord.lat, cityWeather.coord.lon);
    }
  }, [cityWeather]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const filterTomorrowForecast = (forecastList) => {
    const tomorrowDate = getTomorrowDate();
    return forecastList.filter(forecast => forecast.dt_txt.includes(tomorrowDate));
  };

  return (
    <div className="text-center">
      <Form className='mt-4' onSubmit={handleSubmit} inline>
        <Form.Control style={{ width: "40%", display: "inline-block" }} type="text" placeholder="Cerca città" value={searchCity} onChange={handleInputChange} className="mr-sm-2" />
        <Button variant="primary" type="submit" style={{ display: "inline-block" }}>Cerca</Button>
      </Form>
      {loading && ( 
        <Spinner className='mt-3'  animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      )}
      {!loading && cityWeather && ( 
        <Row className="justify-content-center mt-3">
          <Col xs={12} sm={8} md={10} lg={6}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>{cityWeather.name}</Card.Title>
                <Card.Text>Tempo: {cityWeather.weather[0].main}</Card.Text>
                <Card.Text>Descrizione: {cityWeather.weather[0].description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {!loading && forecastWeather && ( 
        <div>
          <h1 className="mt-3">Previsioni future</h1>
          <Row className="justify-content-center mt-3">
            {filterTomorrowForecast(forecastWeather.list).map((forecast, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="custom-card mb-3">
                  <Card.Body>
                    <Card.Title>Data e ora: {forecast.dt_txt}</Card.Title>
                    <Card.Text>Umidità: {forecast.main.humidity}%</Card.Text>
                    <Card.Text>Pressione: {forecast.main.pressure} hPa</Card.Text>
                    <Card.Text>Temperatura: {forecast.main.temp}°C</Card.Text>
                    <Card.Text>Temperatura percepita: {forecast.main.feels_like}°C</Card.Text>
                    <Card.Text>Velocità del vento: {forecast.wind.speed} m/s</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default SearchBar;