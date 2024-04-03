import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Importa los componentes necesarios de React Bootstrap
import './Informacion.css'; 

export default function Informacion() {
  const [informacion, setInformacion] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [tipo, setTipo] = useState('');
  const [info, setInfo] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Función para cargar la información desde el backend
    const fetchInformacion = async () => {
      try {
        const response = await axios.get('https://apipry-dev-gjxn.1.us-1.fl0.io/informacion');
        setInformacion(response.data);
      } catch (error) {
        console.error('Error al cargar la información:', error);
      }
    };

    fetchInformacion();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/${id}`);
      setInformacion(informacion.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error al eliminar la información:', error);
    }
  };

  const handleEditar = (id) => {
    const selectedInfo = informacion.find(item => item._id === id);
    setTipo(selectedInfo.tipo);
    setInfo(selectedInfo.informacion);
    setEditId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTipo('');
    setInfo('');
    setEditId(null);
  };

  const handleGuardarCambios = async () => {
    try {
      await axios.put(`https://apipry-dev-gjxn.1.us-1.fl0.io/informacion/${editId}`, { tipo, informacion: info });
      const updatedInformacion = informacion.map(item => {
        if (item._id === editId) {
          return { ...item, tipo, informacion: info };
        }
        return item;
      });
      setInformacion(updatedInformacion);
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Información</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Tipo</th>
            <th className="text-center">Información</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {informacion.map(item => (
            <tr key={item._id}>
              <td className="text-center">{item.tipo}</td>
              <td>{item.informacion}</td>
              <td className="text-center">
                {/* <button style={{margin:5}} className="btn btn-danger" onClick={() => handleEliminar(item._id)}>Eliminar</button> */}
                <button style={{margin:5}} className="btn btn-primary" onClick={() => handleEditar(item._id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal} onClick={(e) => e.stopPropagation()}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formInformacion">
              <Form.Label>Información</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Ingrese la información" value={info} onChange={(e) => setInfo(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}