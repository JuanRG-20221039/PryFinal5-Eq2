import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import routes from '../../helpers/routes'
//Expresión regular para saber si el nombre de un archivo termina en .jpg, jpeg, gif, png
//const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
export default function NotFoundPage() {
  return (
    <Container>
      <Row className='mt-5'>
        <Col md={{ span: 6, offset: 3 }} className='text-center'>
          <img
            style={{ width: '100%' }}
            src='/images/404-not-found.png'
            alt='error-404' />
          <h2>¿Te has perdido?</h2>
          <p>Vuelve al <Link to={routes.home}>inicio</Link></p>
        </Col>
      </Row>
    </Container>
  )
}
