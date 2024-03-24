import React, { useEffect, useState } from 'react';
import useFetch from '../../../helpers/useFetch';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, FloatingLabel, Form, Modal, Row, Table } from 'react-bootstrap';
import Cargando from '../../../components/Cargando';
import { etiquetaRequest, actualizarCampoDispositivoRequest } from '../../../api/device';
import '../User.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseSignal, faHouseChimneyWindow, faCloudRain, faLock, faLockOpen, faHand, faPenToSquare, faToggleOn, faToggleOff, faCloud, faPowerOff } from '@fortawesome/free-solid-svg-icons';

function DeviceU() {
  const { id } = useParams();

  const [reload, setReload] = useState(false);
  // Usa el ID en la URL para realizar la solicitud
  const { data, loading } = useFetch(`https://apipry-dev-gjxn.1.us-1.fl0.io/devices/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, reload);
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString();
  };
  const [newLabel, setNewLabel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleSaveLabel = async () => {
    try {
      console.log('Nueva etiqueta:', newLabel);
      const response = await etiquetaRequest(id, newLabel);
      console.log(response);
      setShowModal(false);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar un campo específico del dispositivo
  const handleUpdateField = async (campo, valor) => {
    try {
      const response = await actualizarCampoDispositivoRequest(id, campo, valor);
      console.log(response);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const iconosVariables = {
    "Estado de la Ventana": faHouseChimneyWindow,
    "Cerradura": faLock,
    "Sensor de moviniento": faHand,
    "Lluvia": faCloudRain
  };

  //WITCH DE LOS WIGEDS DEL IOT
  const handleSwitchEstado = () => {
    const newEstado = data.dispositivo.estado === 1 ? 0 : 1;
    handleUpdateField('estado', newEstado);
  };
  // Función para manejar el cambio de estado de la cerradura
  const handleSwitchCerradura = () => {
    // Verificar si la ventana está cerrada (estado 1)
    if (data.dispositivo.estado === 1) {
      // Cambiar el estado de la cerradura
      const newCerradura = data.dispositivo.cerradura === 1 ? 0 : 1;
      handleUpdateField('cerradura', newCerradura);
    } else {
      // Mostrar una alerta u otra acción si la ventana está abierta
      alert('No puedes colocar la cerradura si la ventana está abierta!');
    }
  };
  const handleSwitchAltMove = () => {
    const newPirState = data.dispositivo.pir === 1 ? 0 : 1;
    handleUpdateField('pir', newPirState);
  };  

  return (
    <Container className='mt-4'>
      {loading ? (
        <Cargando />
      ) : (
        <Row>
          <h1>𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙘𝙞𝙤𝙣 𝙙𝙚𝙡 𝙙𝙞𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤</h1>
          <Row>
            <Col md={3} sm={12}>
              <Card style={{ fontSize: 13 }}>
                <Card.Header
                  style={{
                    backgroundColor: '#219ebc',
                    color: 'white',
                    height: 90,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                  }}
                >
                  <FontAwesomeIcon className='me-3' icon={faHouseSignal} style={{color: "#fff",height:40, position:'absolute', marginTop:-100, marginLeft:140}} />
                  <Card.Title style={{ fontSize: 16 }}>{data.dispositivo.name ? data.dispositivo.name : data.dispositivo._id}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Title>ID</Card.Title>
                  <Card.Text>{data.dispositivo._id}</Card.Text>
                  <Card.Title>Etiqueta</Card.Title>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Text>{data.dispositivo.name ? data.dispositivo.name : data.dispositivo._id}</Card.Text>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#525760', cursor: 'pointer' }} onClick={() => setShowModal(true)} />
                  </div>
                </Card.Body>
              </Card>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Editar Etiqueta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FloatingLabel controlId='etiqueta' label='Etiqueta' className='mb-4'>
                    <Form.Control type='text' placeholder='Nueva etiqueta' value={newLabel} onChange={handleLabelChange} />
                  </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button variant='primary' onClick={handleSaveLabel}>
                    Guardar
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col>
              <Row>
                <div className="variable-card-container">
                  <Row>
                    {[
                      { id: "Estado de la Ventana", index: 0 },
                      { id: "Cerradura", index: 1 },
                      { id: "Sensor de moviniento", index: 2 },
                      { id: "Lluvia", index: 3 }
                    ].map((variable) => {
                      const variableData = data.variables.find(v => v._id === variable.id);
                      const icono = iconosVariables[variable.id]; // Icono correspondiente a la variable
                      return (
                        <Col className='p-3' key={variable.id}>
                          <Card className='w-100' style={{ fontSize: 13, height:'90%' }}>
                            <Card.Header style={{ backgroundColor: '#219ebc', color: 'white' }}>
                              <Card.Title style={{ fontSize: 30 }}>{variableData.ultimoValor}</Card.Title>
                              <FontAwesomeIcon className='me-3' icon={icono} style={{color: "#fff",height:40, position:'absolute', marginTop:-40, marginLeft:75}} />
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'white', color: 'black' }}>
                              <Card.Text>{variableData._id}</Card.Text>
                              <Card.Text style={{ color: '#5E5E5E' }}>Última actividad</Card.Text>
                              <Card.Text style={{ color: '#363636' }}>{formatFecha(variableData.ultimaFecha)}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Row>
            </Col>
          </Row>
          <Col>
            <Row>
              <h1>𝙋𝙖𝙣𝙚𝙡 𝙙𝙚 𝘾𝙤𝙣𝙩𝙧𝙤𝙡</h1>
              <Row>
                <div className="variable-card-container">
                  {/* Tarjeta Estado de la ventana */}
                  <Card style={{ width: '18rem', marginRight: '1rem' }}>
                    <Card.Body>
                      <Card.Title>Estado de la ventana</Card.Title>
                      <Card.Text>{data.dispositivo.estado === 1 ? "CERRADA" : "ABIERTA"}</Card.Text>
                      <div style={{ width: '100%',marginLeft:50 }} onClick={() => handleSwitchEstado()}>
                        <FontAwesomeIcon 
                          icon={data.dispositivo.estado === 1 ? faPowerOff : faPowerOff} 
                          style={{ color: data.dispositivo.estado === 1 ? 'red' : 'green', height: '50%', width: '50%', cursor: 'pointer' }} 
                        />
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Tarjeta Cerradura */}
                  <Card style={{ width: '18rem', marginRight: '1rem' }}>
                    <Card.Body>
                      <Card.Title>Cerradura</Card.Title>
                      <Card.Text>{data.dispositivo.cerradura === 1 ? "CERRADA" : "ABIERTA"}</Card.Text>
                      <div style={{ width: '100%',marginLeft:50 }} onClick={() => handleSwitchCerradura()}>
                        <FontAwesomeIcon
                          icon={data.dispositivo.cerradura === 1 ? faLock : faLockOpen}
                          style={{ color: data.dispositivo.cerradura === 1 ? '#fb8500' : 'grey', height: '50%', width: '50%', cursor: 'pointer' }}
                        />
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Tarjeta Alerta de movimiento */}
                  <Card style={{ width: '18rem', marginRight: '1rem' }}>
                    <Card.Body>
                      <Card.Title>Alerta de movimiento</Card.Title>
                      <Card.Text>{data.dispositivo.pir === 1 ? "ACTIVADA" : "DESACTIVADA"}</Card.Text>
                      <div style={{ width: '100%',marginLeft:50 }} onClick={() => handleSwitchAltMove()}>
                        <FontAwesomeIcon
                          icon={data.dispositivo.pir === 1 ? faToggleOn : faToggleOff}
                          style={{ color: data.dispositivo.pir === 1 ? '#219ebc' : 'grey', height: '50%', width: '50%', cursor: 'pointer' }}
                        />
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Tarjeta Lluvia */}
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Lluvia</Card.Title>
                      <Card.Text>{data.dispositivo.lluvia === 1 ? "ESTA LLOVIENDO" : "DESPEJADO..."}</Card.Text>
                      {data.dispositivo.lluvia === 1 ? (
                        <FontAwesomeIcon icon={faCloudRain} style={{ color: '#5ca8d2', height: '50%', width: '50%' , marginTop:10 , marginLeft:50 }} />
                      ) : (
                        <FontAwesomeIcon icon={faCloud} style={{ color: 'grey', height: '50%', width: '50%' , marginTop:10 , marginLeft:50  }} />
                      )}
                    </Card.Body>
                  </Card>

                </div>
              </Row>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default DeviceU;