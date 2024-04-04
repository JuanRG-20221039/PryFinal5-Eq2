import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap';
import Cargando from '../../components/Cargando';
import { agregarDispositivoRequest, asignarDispositivoRequest, eliminarDispositivoRequest, usuariosRequest } from '../../api/device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTabletButton } from '@fortawesome/free-solid-svg-icons';
import '../../Estilos.css'
export default function Device() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reloadTable, setReloadTable] = useState(false);
    const [usuarios, setUsuarios] = useState(null)
    const [loadingU, setLoadingU] = useState(true)
    const [dispositivo, setDispositivo] = useState(null)
    useEffect(() => {
        setLoading(true);
        fetch('https://apipry-dev-gjxn.1.us-1.fl0.io/devices')
            .then((response) => response.json())
            .then((data) => setData(data))
            .finally(() => setLoading(false))

    }, [reloadTable]);

    const [showModal, setShowModal] = useState(false);
    const eliminarDispositivo = async (dispositivoID) => {
        const response = await eliminarDispositivoRequest(dispositivoID)
        console.log(response)
        setReloadTable(!reloadTable);
    }
    const handleAsignarClick = async (dispositivoID) => {
        setDispositivo(dispositivoID)
        setShowModal(true);
        const usuarios = await usuariosRequest();

        setUsuarios(usuarios.data)
        setLoadingU(false)
        
    };

    const handleSelectUser = async (usuario) => {
        // Aquí puedes manejar la lógica para asignar el usuario seleccionado al dispositivo
        console.log('Usuario seleccionado:', usuario);
        const asignacion = await asignarDispositivoRequest(dispositivo, usuario)
        console.log(asignacion)
        setShowModal(false);
        setReloadTable(!reloadTable);
    };
    const nuevoDispositivo = async () => {
        const response = await agregarDispositivoRequest();
        console.log(response)
        setReloadTable(!reloadTable);
    }
    console.log(usuarios)
    return (
        <Container className='mt-4'>
            <div style={{display:'flex',alignContent:'center'}}>
                <FontAwesomeIcon className='me-3' icon={faTabletButton} style={{color: "#000000",height:40}} />
                <h1>𝘿𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨</h1>
            </div>
            <Button style={{width:'50%'}} variant='success' className='mb-4' onClick={() => nuevoDispositivo()}>Nuevo dispositivo</Button>
            {
                loading ? (<Cargando />) : (
                    <>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Estado de la Ventana</th>
                                    <th>Cerradura</th>
                                    <th>Deteccion de Moviniento</th>
                                    <th>Sensor de Lluvia</th>
                                    <th>Asignado</th>
                                    <th>Estado del dispositivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(dispositivo => (
                                    <tr key={dispositivo._id}>
                                        <td>{dispositivo._id}</td>
                                        <td>{dispositivo.estado}</td>
                                        <td>{dispositivo.cerradura}</td>
                                        <td>{dispositivo.pir}</td>
                                        <td>{dispositivo.lluvia}</td>
                                        <td>{dispositivo.asignado ? 'Asignado' : 'No asignado'}</td>
                                        <td>
                                            <div className="d-grid gap-2">
                                                <Button variant='primary' className='' onClick={() => handleAsignarClick(dispositivo._id)}>Asignar</Button>
                                                <Button variant='danger' onClick={() => eliminarDispositivo(dispositivo._id)}>Eliminar</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Seleccionar Usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Dispositivos asignados</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loadingU ? (<Cargando />) : (
                                                usuarios.map(usuario => (
                                                    <tr>
                                                        <td>{usuario.datosCuenta.email}</td>
                                                        <td>{usuario.dispositivos.length === 0 ? 'Sin dispositivos' : (
                                                            <ul className='lista'>
                                                                {usuario.dispositivos.map(dispositivo => (
                                                                    <li>{dispositivo.idDispositivo}</li>
                                                                ))}
                                                            </ul>
                                                        )}</td>
                                                        <td><Button variant='primary' onClick={() => handleSelectUser(usuario._id)}>Asignar</Button></td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )
            }
        </Container>
    )
}
