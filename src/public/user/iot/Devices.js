import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import useAuth from '../../../auth/useAuth'
import useFetch from '../../../helpers/useFetch'
import Cargando from '../../../components/Cargando'
import { Link } from 'react-router-dom'
import routes from '../../../helpers/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouseSignal} from '@fortawesome/free-solid-svg-icons'

function Devices() {
    const {user}=useAuth()
    const {data,loading}=useFetch('https://apipry-dev-gjxn.1.us-1.fl0.io/devices/user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id })
    })
    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleString();
    };
  return (
    <Container className='mt-3'>
        <div style={{display:'flex',alignContent:'center'}}>
            <FontAwesomeIcon className='me-3' icon={faHouseSignal} style={{color: "#000000",height:40}} />
            <h1>𝘿𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨</h1>
        </div>
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
                    <td><Link to={routes.iotU+`devices/${dispositivo.idDispositivo._id}`}>{dispositivo.idDispositivo.name?dispositivo.idDispositivo.name:dispositivo.idDispositivo._id}</Link></td>
                    <td>{formatFecha(dispositivo.idDispositivo.updatedAt)}</td>
                    <td>{formatFecha(dispositivo.idDispositivo.createdAt)}</td>
                    <td>
                        <div className="d-grid gap-2">
                        </div>
                    </td>
                </tr>
            )))}
            </tbody>
        </Table>
    </Container>
  )
}

export default Devices