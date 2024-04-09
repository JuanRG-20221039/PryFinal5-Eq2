import React, { useEffect, useState } from 'react';
import useFetch from '../../../helpers/useFetch';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Container, FloatingLabel, Form, Modal, Row, Table } from 'react-bootstrap';
import Cargando from '../../../components/Cargando';
import { etiquetaRequest, actualizarCampoDispositivoRequest } from '../../../api/device';
import '../User.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseSignal, faHouseChimneyWindow, faCloudRain, faLock, faLockOpen, faHand, faPenToSquare, faToggleOn, faToggleOff, faCloud, faPowerOff } from '@fortawesome/free-solid-svg-icons';

function DeviceU() {
  const { id } = useParams();
  const [newLabel, setNewLabel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [previousData, setPreviousData] = useState(null); // Para almacenar los datos anteriores
  const [data, setData] = useState(null); // Para almacenar los datos actuales
  const [reload, setReload] = useState(false);

  const { loading } = useFetch(`https://apipry.onrender.com/devices/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, reload);

  const fetchData = async () => {
    try {
      const newData = await fetch(`https://apipry.onrender.com/devices/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json());

      // Comparar los datos anteriores con los nuevos
      if (JSON.stringify(previousData) !== JSON.stringify(newData)) {
        setData(newData);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // Consulta la API cada segundo
  useEffect(() => {
    const intervalId = setInterval(fetchData, 1000);
    
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Almacena los datos actuales como datos anteriores después de actualizar
    if (data) {
      setPreviousData(data);
    }
  }, [data]);

  if (!data) {
    return <Cargando />;
  }

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString();
  };

  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  //NOMBRE DEL DISPOSITIVO
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

  //ICONOS DE LOS WIGEDS
  const iconosVariables = {
    "estado": faHouseChimneyWindow,
    "cerradura": faLock,
    "pir": faHand,
    "lluvia": faCloudRain
  };

  //WITCH DE LOS WIGEDS DEL IOT
  const handleSwitchEstado = () => {
    if(data.dispositivo.cerradura === 1){
      alert('No puedes abrir la ventana, la cerradura esta colocada!');
      return;
    } else{
      const newEstado = data.dispositivo.estado === 1 ? 0 : 1;
      handleUpdateField('estado', newEstado);
    }
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

  //SENSOR DE MOVINIENTO
  const handleSwitchAltMove = () => {
    const newPirState = data.dispositivo.pir === 1 ? 0 : 1;
    handleUpdateField('pir', newPirState);
  };

  //ELIMINAR DISPOSITIVOS
  const handleEliminarDispositivo = async () => {
    try {
        const response = await fetch(`https://apipry.onrender.com/devices/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Dispositivo eliminado correctamente');
          // Realizar cualquier otra acción necesaria después de eliminar el dispositivo
        } else {
          alert('Error al eliminar el dispositivo:', response.statusText);
        }
    } catch (error) {
      console.error('Error al eliminar el dispositivo:', error);
    }
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
                      { id: "Estado de la Ventana", key: "estado", icon: faHouseChimneyWindow },
                      { id: "Cerradura", key: "cerradura", icon: faLock },
                      { id: "Sensor de movimiento", key: "pir", icon: faHand },
                      { id: "Lluvia", key: "lluvia", icon: faCloudRain }
                    ].map((variable) => {
                      const variableData = data.dispositivo[variable.key];
                      const icono = iconosVariables[variable.key];
                      return (
                        <Col className='p-3' key={variable.id}>
                          <Card className='w-100' style={{ fontSize: 13, height:'90%' }}>
                            <Card.Header style={{ backgroundColor: '#219ebc', color: 'white' }}>
                              <Card.Title style={{ fontSize: 30 , marginLeft:-50}}>{variableData}</Card.Title>
                              <FontAwesomeIcon className='me-3' icon={icono} style={{color: "#fff",height:40, position:'absolute', marginTop:-40, marginLeft:5}} />
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: 'white', color: 'black' }}>
                              <Card.Text>{variable.id}</Card.Text>
                              <Card.Text style={{ color: '#5E5E5E' }}>Última actividad</Card.Text>
                              <Card.Text style={{ color: '#363636' }}>{formatFecha(data.dispositivo.ultimaFecha)}</Card.Text>
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
                      <div style={{ width: '100%'}} onClick={() => handleSwitchEstado()}>
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
                      <div style={{ width: '100%'}} onClick={() => handleSwitchCerradura()}>
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
                      <div style={{ width: '100%'}} onClick={() => handleSwitchAltMove()}>
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
                        <FontAwesomeIcon icon={faCloudRain} style={{ color: '#5ca8d2', height: '50%', width: '50%' , marginTop:10}} />
                      ) : (
                        <FontAwesomeIcon icon={faCloud} style={{ color: 'grey', height: '50%', width: '50%' , marginTop:10}} />
                      )}
                    </Card.Body>
                  </Card>

                </div>
              </Row>
            </Row>
          </Col>
          <Col>
            <Link to="/user/iot/devices" style={{ textDecoration: 'none' }}>
              <Button variant='danger' style={{ margin: 20, width: '50%' }} onClick={handleEliminarDispositivo}>Eliminar Dispositivo</Button>
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default DeviceU;