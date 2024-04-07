import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './HomeEstilos.css';

export default function Politicas() {
  const [rg1Info, setRG1Info] = useState('');
  const [rgh1Info, setRGH1Info] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRG1 = await fetch('https://apipry.onrender.com/informacion/tipo/RG1');
        const dataRG1 = await responseRG1.json();
        if (dataRG1.length > 0) {
          setRG1Info(dataRG1[0].informacion);
        }

        const responseRGH1 = await fetch('https://apipry.onrender.com/informacion/tipo/RGH1');
        const dataRGH1 = await responseRGH1.json();
        if (dataRGH1.length > 0) {
          setRGH1Info(dataRGH1[0].informacion);
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
            <h2>Reglas</h2>
            <p>{rg1Info}</p>
          </Card>

          <Card>
            <h2>Reglas de Healthy & Nutritions</h2>
            <p>{rgh1Info}</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
