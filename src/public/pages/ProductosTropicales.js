import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../helpers/useFetch';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Cargando from '../../components/Cargando';
import routes from '../../helpers/routes';

export default function ProductosTropicales() {

    const { data, loading } = useFetch('https://apipry.onrender.com/productos');
    console.log(data);

    return (
        <div>
            <br></br>
            <Container>
            <h1>𝘾𝙖𝙩𝙖𝙡𝙤𝙜𝙤 𝙙𝙚 𝙁𝙧𝙪𝙩𝙤𝙨 𝙏𝙧𝙤𝙥𝙞𝙘𝙖𝙡𝙚𝙨</h1>
            <Row sm={2} md={3} lg={4}>
                {loading ? (
                <Cargando />
                ) : (
                data.filter(producto => producto.tipo === "tropicales").map(producto => (
                    <Col key={producto._id}>
                    <Card style={{ maxWidth: 280, marginBottom: 20 }}>
                        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: 220 }} />
                        <Card.Body>
                        <Card.Title>{producto.nombre}</Card.Title>
                        <Card.Text>{producto.descripcion}</Card.Text>
                        <Card.Text>{producto.precio}</Card.Text>
                        <Link to={`/products/${producto._id}`}>
                            <Button variant="primary">Ver detalles</Button>
                        </Link>
                        </Card.Body>
                    </Card>
                    </Col>
                ))
                )}
            </Row>
            </Container>
        </div>
    );
}
