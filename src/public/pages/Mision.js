import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './HomeEstilos.css';

export default function Mision() {
  const [misi1Info, setMisi1Info] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/tipo/MISI1');
        const data = await response.json();
        if (data.length > 0) {
          setMisi1Info(data[0].informacion);
        }
      } catch (error) {
        console.error('Error fetching information:', error);
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
          <Card>
            <h2>Misión</h2>
          </Card>

          <Card>
            <p>
              Es su razón de ser; es el propósito o motivo por el cual existe y, por tanto, 
              da sentido y guía sus actividades.
            </p>
          </Card>

          <Card>
            <h2>Misión de Healthy & Nutritions: </h2>
            <p>{misi1Info}</p>
          </Card>
        </div>
      </section>
    </div>
  );
}