import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Image } from 'react-bootstrap';
import Cargando from '../../components/Cargando';
import useFetch from '../../helpers/useFetch';
import './HomeEstilos.css'

export default function ProductosRojos() {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [producto, setProducto] = useState(null); // Estado para almacenar el producto

  const { data, loading } = useFetch('https://apipry-dev-gjxn.1.us-1.fl0.io/productos');

  useEffect(() => {
    // Filtrar el producto correspondiente al ID de la URL
    if (!loading && data) {
      const productoEncontrado = data.find(producto => producto._id === id);
      setProducto(productoEncontrado);
    }
  }, [data, id, loading]);

  return (
    <section>
      <Card>
        <h1>𝘿𝙚𝙩𝙖𝙡𝙡𝙚𝙨 𝙙𝙚𝙡 𝙋𝙧𝙤𝙙𝙪𝙘𝙩𝙤</h1>
      </Card>
      <Card>
        <div>
        <Container>
          {loading ? (
            <Cargando />
          ) : producto ? (
            <Row>
              <Col sm={6}>
                <Card style={{ maxWidth: '57%', marginBottom: 20 }}>
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ width: '100%'}}
                  />
                </Card>
              </Col>
              <Col sm={6}>
                <Card style={{ maxWidth: '100%', marginBottom: 20 }}>
                  <Card.Body>
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>{producto.descripcion}</Card.Text>
                    <Card.Text>Precio: {producto.precio}</Card.Text>
                    <Card.Text>Stock: {producto.stock}</Card.Text>
                    <Col>
                      <Row>
                        <Button variant="primary" onClick={() => console.log('Comprar')}>
                          Comprar
                        </Button>
                      </Row>
                      <br></br>
                      <Row>
                        <Button variant="secondary" href="/">
                          Cancelar
                        </Button>
                      </Row>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <p>Producto no encontrado</p>
          )}
          <br></br>
        </Container>
        </div>
      </Card>
      <Image src='/images/fondo.png' className='background-image'/>
    </section>
  );
}