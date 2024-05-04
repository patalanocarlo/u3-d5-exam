import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card,  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import napoliImage from './Napoli3.jpeg'; 
import milanoImage from "./milano.jpg"
import torinoImage from "./torino.jpg"
import bolognaImage from "./bologna.jpg"
import cagliariImage from "./cagliari.jpg"
import './Home.css'; 
import BariImage from "./Bari.jpg"
const Home = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchWeatherData = async () => {
     
      const cities = ['Napoli', 'Milano', 'Torino', 'Bologna', 'Cagliari',"Bari"];
      const apiKey = '97da70be3c91051aa093be5ea7a21ced';
      const promises = cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
      );

      try {
        const responses = await Promise.all(promises);
        const data = await Promise.all(responses.map(response => response.json()));
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const handleCardClick = (cityData) => {
    navigate(`/meteo-specifico/${cityData.id}`, { state: { cityData } }); 
  };

  return (
    <div>
      <div className='container-fluid'>
        <h1 className='text-center mb-3'>Le Città più famose</h1>
        <Row>
          <Col className='mt-3 mb-2' xs={12} sm={6} md={4} lg={2}>
            <h2 className='mb-3'>Napoli</h2>
            <a href="#d">
              <img src={napoliImage} alt="Napoli" className="img-fluid custom-image" />
            </a>
          </Col>
          <Col className='mt-3 mb-2' xs={12} sm={6} md={4} lg={2}>
            <h2  className='mb-3'>Milano</h2>
            <a href="d">
              <img src={milanoImage} alt="Milano" className="img-fluid custom-image" />
            </a>
          </Col>
          <Col className='mt-3 mb-2' xs={12} sm={6} md={4} lg={2}>
            <h2  className='mb-3'>Torino</h2>
            <a href="#d">
              <img src={torinoImage} alt="Torino" className="img-fluid custom-image" />
            </a>
          </Col>
          <Col className='mt-3 mb-2' xs={12} sm={6} md={4} lg={2}>
            <h2  className='mb-3'>Bologna</h2>
            <a href="#d">
              <img src={bolognaImage} alt="Bologna" className="img-fluid custom-image" />
            </a>
          </Col>
          <Col className='mt-3 mb-2' xs={12} sm={6} md={4} lg={2}>
            <h2  className='mb-3'>Cagliari</h2>
            <a href="#d">
              <img src={cagliariImage} alt="Cagliari" className="img-fluid custom-image" />
            </a>
          </Col>
          <Col className='mt-3 mb-2' xs={12} sm={6} md={4} lg={2}>
            <h2  className='mb-3'>Bari</h2>
            <a href="#d">
              <img src={BariImage} alt="Cagliari" className="img-fluid custom-image" />
            </a>
          </Col>
        </Row>
        <hr className='container mt-5' />
        <Row className="mt-5 mb-3">
            <h2 className='text-center mb-'>La situazione nella altre grandi città</h2>
          {weatherData.map((cityData, index) => (
            <Col key={index} className='mb-3' xs={12} sm={6} md={4} lg={2}>
              <Card className="custom-card" onClick={() => handleCardClick(cityData)}>
                <Card.Body>
                  <Card.Title>{cityData.name}</Card.Title>
                  <Card.Text>
                    Temperatura: {(cityData.main.temp - 273.15).toFixed(1)}°C
                  </Card.Text>
                  <Card.Text>
                    Condizione: {cityData.weather[0].description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="text-center bg-dark">
            <h2 className='text-white'>Spero possiate trovare tutto il meteo di cui avete bisogno!</h2>
            <p className='text-white'>Se avete domande o commenti, contattateci</p>
            <Button variant="primary">Contattaci</Button>
          </Col>
        </Row>
      </div>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Benvenuto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Benvenuto alla nostra pagina di meteo!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlert(false)}>Chiudi</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;