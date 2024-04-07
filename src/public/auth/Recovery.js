import React, { useState } from 'react';
import { Col, Form, Alert, Card } from 'react-bootstrap';
import './EstilosAuth.css';
import { Modal, Button } from 'react-bootstrap';

export default function Recovery() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');

  const [id, setId] = useState('');

  const [email, setEmail] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [alertaBuscar, setAlertaBuscar] = useState('');
  const [alertaRespuesta, setAlertaRespuesta] = useState('');
  const [alertaRespuestaVariant, setAlertaRespuestaVariant] = useState('danger');
  const [respuestaGuardada, setRespuestaGuardada] = useState('');

  const [segundoCardVisible, setSegundoCardVisible] = useState(false); // Estado para indicar si el segundo card está visible

  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [alertaContrasena, setAlertaContrasena] = useState('');

  const [tercerCardVisible, setTercerCardVisible] = useState(false); // Estado para indicar si el tercer card está visible

const handleEnviarContrasena = async () => {
  if (nuevaContrasena.length < 8 || confirmarContrasena.length < 8) {
    setAlertaContrasena('Las contraseñas deben tener al menos 8 caracteres');
    return;
  }

  if (nuevaContrasena !== confirmarContrasena) {
    setAlertaContrasena('Las contraseñas no coinciden');
    return;
  }

  try {
    // Realizar la solicitud para cambiar la contraseña utilizando el ID del usuario
    const responseCambioContrasena = await fetch(`https://apipry.onrender.com/usuarios/${id}/cambiar-contrasena`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nuevaContrasena: nuevaContrasena,
      }),
    });

    console.log(id)

    if (responseCambioContrasena.ok) {
      // La contraseña se actualizó correctamente
      // Mostrar el mensaje de éxito
      setModalMensaje('¡Contraseña cambiada con éxito!');
      setModalVisible(true);
    } else {
      // Hubo un error al actualizar la contraseña
      // Mostrar un mensaje de error
      setModalMensaje('Hubo un error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.');
      setModalVisible(true);
    }
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    // Mostrar un mensaje de error
    setModalMensaje('Hubo un error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.');
    setModalVisible(true);
  }

  // Limpiar los campos y ocultar el tercer card
  setAlertaContrasena('');
  setNuevaContrasena('');
  setConfirmarContrasena('');
  //setTercerCardVisible(false); // Ocultar el tercer card después de cambiar la contraseña
};

const ModalMensaje = ({ show, mensaje, onClose }) => {

const handleClose = () => {
  window.location.href = '/';
  onClose();
};

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mensaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

  const buscarEmail = async () => {
    try {
      const response = await fetch('https://apipry.onrender.com/usuarios');
      const data = await response.json();
      const usuario = data.find(user => user.datosCuenta.email === email);
      if (usuario) {
        const idPregunta = usuario.datosCuenta.preguntaRecuperacion.idPregunta;
        const preguntaResponse = await fetch(`https://apipry.onrender.com/questions/${idPregunta}`);
        const preguntaData = await preguntaResponse.json();
        if (preguntaData.pregunta) {
          setPreguntaSecreta(preguntaData.pregunta);
          setRespuestaGuardada(usuario.datosCuenta.preguntaRecuperacion.respuesta);
          setSegundoCardVisible(true); // Mostramos el segundo card
          setAlertaBuscar('');
          setId(usuario._id)
        } else {
          setAlertaBuscar('No se pudo encontrar la pregunta secreta correspondiente');
        }
      } else {
        setAlertaBuscar('El correo electrónico no existe');
      }
    } catch (error) {
      console.error('Error al buscar la pregunta secreta:', error);
      setAlertaBuscar('Error al buscar la pregunta secreta');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      buscarEmail();
    } else {
      setAlertaBuscar('Por favor, ingresa un correo electrónico');
    }
  };

  const handleEnviar = () => {
    if (respuestaUsuario === '') {
      setAlertaRespuesta('Por favor, ingresa una respuesta');
      return;
    }

    if (respuestaUsuario === respuestaGuardada) {
      setAlertaRespuesta('¡Respuesta correcta!');
      setAlertaRespuestaVariant('success');
      
      setSegundoCardVisible(true); // Mostramos el segundo card
      setTercerCardVisible(true); // Mostramos el tercer card
      setAlertaBuscar('');
    } else {
      setAlertaRespuesta('Respuesta incorrecta');
      setAlertaRespuestaVariant('danger');
    }
  };

  return (
    <div className="background-container">
      <Col>
        <Card style={{width:'60%'}}>
          <div className='form'>
            <form onSubmit={handleSubmit}>
              <div>
                <Col>
                  <h1>𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙚𝙡 𝙘𝙤𝙧𝙧𝙚𝙤 𝙚𝙡𝙚𝙘𝙩𝙧𝙤𝙣𝙞𝙘𝙤</h1>
                  <label>Ingresa el correo electrónico de la cuenta correspondiente:</label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className='btnBuscar' disabled={segundoCardVisible}>Buscar</button> {/* Deshabilitar el botón cuando el segundo card está visible */}
                  {alertaBuscar && <Alert variant="danger" style={{ marginTop: '10px' }}>{alertaBuscar}</Alert>}
                </Col>
              </div>
            </form>
          </div>
        </Card>
      </Col>
      {segundoCardVisible && (
        <div className='center' style={{ marginTop: '20px' }}>
          <Card style={{width:'60%'}}>
            <div className='form'>
              <div>
                <Col>
                  <h2>Pregunta secreta:</h2>
                  <p>{preguntaSecreta}</p>
                  <Form.Control
                    type="text"
                    placeholder="Respuesta"
                    value={respuestaUsuario}
                    onChange={(e) => setRespuestaUsuario(e.target.value)}
                  />
                  <button type="button" className='btnBuscar' onClick={handleEnviar} disabled={tercerCardVisible}>Enviar</button>
                  {alertaRespuesta && <Alert variant={alertaRespuestaVariant} style={{ marginTop: '10px' }}>{alertaRespuesta}</Alert>}
                </Col>
              </div>
            </div>
          </Card>
        </div>
      )}
      {tercerCardVisible && (
        <div className='center' style={{ marginTop: '20px'}}>
          <Card style={{width:'60%'}}>
            <div className='form'>
              <div>
                <Col>
                  <h2>Cambiar Contraseña:</h2>
                  <Form.Control
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                    style={{ marginTop: '20px' }}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    style={{ marginTop: '20px' }}
                  />
                  <button type="button" className='btnBuscar' onClick={handleEnviarContrasena}>Enviar</button>
                  {alertaContrasena && <Alert variant="danger" style={{ marginTop: '10px' }}>{alertaContrasena}</Alert>}
                </Col>
              </div>
            </div>
          </Card>
        </div>
      )}
      <ModalMensaje
        show={modalVisible}
        mensaje={modalMensaje}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}