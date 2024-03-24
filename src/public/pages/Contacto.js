import React, { useState } from 'react';
import './Contacto.css'; // Archivo CSS para los estilos del formulario
import { Card } from 'react-bootstrap';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado correctamente');
  };

  return (
    <section>
      <div className="background-image">
        <img src='/images/fondo.png' alt="background" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Contacto:</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">Enviar</button>
        </form>
        <Card className="image-card">
          <img src='/images/chat.png' alt="chat" />
        </Card>
      </div>
    </section>
  );
};

export default Contacto;
