import React, { useState, useEffect } from 'react';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloudy } from 'react-icons/wi';
import { useNavigate } from 'react-router-dom';
import './Meteo.css'; 

const Meteo = () => {
  const [meteoData, setMeteoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeteoData = async () => {
      try {
        const cities = generateRandomCities();
        const requests = cities.map(city =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97da70be3c91051aa093be5ea7a21ced`)
            .then(response => response.json())
        );
        const responses = await Promise.all(requests);
        setMeteoData(responses);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching meteo data:', error);
        setIsLoading(false);
      }
    };

    fetchMeteoData();
  }, []);

 
  const generateRandomCities = () => {
    const cities = [
      "Rome", "Paris", "Madrid", "Berlin", "Amsterdam", "Vienna", "Brussels", "Lisbon", "Prague", "Budapest",
      "Warsaw", "Zurich", "Athens", "Oslo", "Stockholm", "Helsinki", "Copenhagen", "Dublin", "Moscow", "Istanbul"
    ];

    const uniqueCities = new Set();
    while (uniqueCities.size < 20) {
      const randomIndex = Math.floor(Math.random() * cities.length);
      uniqueCities.add(cities[randomIndex]);
    }

    return Array.from(uniqueCities);
  };

  const mapWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return <WiDaySunny />;
      case '01n':
        return <WiDaySunny />;
      case '02d':
        return <WiCloudy />;
      case '02n':
        return <WiCloudy />;
      case '03d':
      case '03n':
        return <WiCloudy />;
      case '04d':
      case '04n':
        return <WiCloudy />;
      case '09d':
      case '09n':
        return <WiRain />;
      case '10d':
      case '10n':
        return <WiRain />;
      case '11d':
      case '11n':
        return <WiThunderstorm />;
      case '13d':
      case '13n':
        return <WiSnow />;
      default:
        return null;
    }
  };

  const handleCardClick = (cityData) => {
    navigate(`/meteo-specifico/${cityData.id}`, { state: { cityData } }); 
  };
  return (
    <div className='container-fluid'>
      <h1 className="text-center mb-4">Previsioni Meteo</h1>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row  xs={1} sm={2} md={3} lg={4} className="g-4">
          {meteoData.map((data, index) => (
            <Col key={index}>
              <Card className="custom-card h-100" onClick={() => handleCardClick(data)}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-3">{mapWeatherIcon(data.weather[0].icon)}</div>
                  <Card.Title className="text-center mb-2">{data.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{data.weather[0].main}</Card.Subtitle>
                  <Card.Text className="text-center">{data.weather[0].description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Meteo;