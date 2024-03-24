import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './HomeEstilos.css';

export default function Vision() {
  const [visi1Info, setVisi1Info] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/tipo/VISI1');
        const data = await response.json();
        if (data.length > 0) {
          setVisi1Info(data[0].informacion);
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
            <h2>Visión</h2>
          </Card>

          <Card>
            <p>
              Permite establecer objetivos y estrategias que se convierten en acciones que inspiren a todos los miembros del equipo para llegar a la meta.
            </p>
          </Card>

          <Card>
            <h2>Visión de Healthy & Nutritions</h2>
            <p>{visi1Info}</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
