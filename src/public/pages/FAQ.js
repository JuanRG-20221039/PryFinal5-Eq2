import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './HomeEstilos.css';

export default function FAQ() {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/faq');
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="background-image">
        <img src='/images/fondo.png' alt="background" style={{ width: '100%', height: '100%' }} />
      </div>
      <section className="section">
        <div>
          {faqData.map((item, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{item.pregunta}</Card.Title>
                <Card.Text>{item.respuesta}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}