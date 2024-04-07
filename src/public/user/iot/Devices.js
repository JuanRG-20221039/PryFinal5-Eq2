import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap'
import useAuth from '../../../auth/useAuth'
import useFetch from '../../../helpers/useFetch'
import Cargando from '../../../components/Cargando'
import { Link } from 'react-router-dom'
import routes from '../../../helpers/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseSignal } from '@fortawesome/free-solid-svg-icons'
import { asignarDispositivoRequest } from '../../../api/device'

function Devices() {

    const { user } = useAuth()
    const { data, loading } = useFetch('https://apipry.onrender.com/devices/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id })
    })

    const [showModal, setShowModal] = useState(false);
    const [codigo, setCodigo] = useState('');

    const handleAgregarDispositivo = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setCodigo('');
    }

    const handleSubmitModal = async () => {
        try {
            const response = await fetch('https://apipry.onrender.com/devices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenD: codigo }),
            });
            const data = await response.json();
            console.log('Nuevo dispositivo creado:', data);
            setShowModal(false);
            setCodigo('');
        } catch (error) {
            console.error('Error al crear el dispositivo:', error);
        }

        try {
            const response = await fetch(`https://apipry.onrender.com/devices/token/${codigo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Dispositivo encontrado:', data._id);
            console.log('Usuario:', user.id);

            const asignacion = await asignarDispositivoRequest(data._id, user.id);
            console.log(asignacion)

            setShowModal(false);
            setCodigo('');

        } catch (error) {
            console.error('Error al buscar el dispositivo:', error);
        }
    };

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleString();
    };

    return (
        <Container className='mt-3'>
            <div style={{ display: 'flex', alignContent: 'center' }}>
                <FontAwesomeIcon className='me-3' icon={faHouseSignal} style={{ color: "#000000", height: 40 }} />
                <h1>𝘿𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨</h1>
            </div>

            <Button style={{ margin: 15, width: '50%' }} variant='success' onClick={handleAgregarDispositivo}>Agregar Dispositivo</Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <td>Dispositivo</td>
                        <td>Última actividad</td>
                        <td>Creado en</td>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <Cargando />
                    ) : (data.map(dispositivo => (
                        <tr key={dispositivo._id}>
                            <td><Link to={routes.iotU + `devices/${dispositivo.idDispositivo._id}`}>{dispositivo.idDispositivo.name ? dispositivo.idDispositivo.name : dispositivo.idDispositivo._id}</Link></td>
                            <td>{formatFecha(dispositivo.idDispositivo.updatedAt)}</td>
                            <td>{formatFecha(dispositivo.idDispositivo.createdAt)}</td>
                        </tr>
                    )))}
                </tbody>
            </Table>

            {/* Modal para agregar dispositivo */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Dispositivo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formCodigo">
                            <Form.Label>Código</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa el código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSubmitModal}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Devices