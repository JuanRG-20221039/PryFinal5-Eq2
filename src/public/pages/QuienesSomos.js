import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './HomeEstilos.css';

export default function QuienesSomos() {
  const [qs1Info, setQS1Info] = useState('');
  const [fe1Info, setFE1Info] = useState('');
  const [obj1Info, setOBJ1Info] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseQS1 = await fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/tipo/QS1');
        const dataQS1 = await responseQS1.json();
        if (dataQS1.length > 0) {
          setQS1Info(dataQS1[0].informacion);
        }

        const responseFE1 = await fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/tipo/FE1');
        const dataFE1 = await responseFE1.json();
        if (dataFE1.length > 0) {
          setFE1Info(dataFE1[0].informacion);
        }

        const responseOBJ1 = await fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/tipo/OBJ1');
        const dataOBJ1 = await responseOBJ1.json();
        if (dataOBJ1.length > 0) {
          setOBJ1Info(dataOBJ1[0].informacion);
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
            <h2>Quiénes somos</h2>
          </Card>

          <Card>
            <h2>¿Que es Healthy & Nutritions (H&N)?</h2>
            <p>{qs1Info}</p>
          </Card>

          <Card>
            <h2>Filosofía Empresarial</h2>
            <p>{fe1Info}</p>
          </Card>

          <Card>
            <h2>Objetivo</h2>
            <p>{obj1Info}</p>
          </Card>
        </div>
      </section>
    </div>
  );
}