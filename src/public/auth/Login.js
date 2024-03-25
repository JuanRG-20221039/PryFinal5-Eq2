import React, { useState } from 'react';
import useAuth from '../../auth/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card, Col, Container, FloatingLabel, Form, Image, Row } from 'react-bootstrap';
import routes from '../../helpers/routes';
import { loginRequest } from '../../api/auth';

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };
    try {
      // solicitud del login
      const response = await loginRequest(userCredentials);

      // Obtener datos de respuesta si es necesario
      const responseData = response.data;
      login(responseData, location.state?.from);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      // Manejar errores según sea necesario
      alert('Error al iniciar sesion...');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Image src='/images/fondo.png' style={{ width: 1310, height: 600 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container style={{ width: '30rem' }}>
          <Card style={{ marginBottom: 40, marginTop: 40 }} className='p-4'>
            <h1 className="my-4">𝙄𝙣𝙞𝙘𝙞𝙖𝙧 𝙎𝙚𝙨𝙞𝙤𝙣</h1>
            <Form onSubmit={handleLogin} autoComplete='off'>
                {/* Username input */}
                <FloatingLabel controlId="email" label="Correo Electronico" className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FloatingLabel>

                {/* Password input */}
                <FloatingLabel controlId="password" label="Contraseña" className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FloatingLabel>

                <div className="d-grid gap-2">
                  {/* Submit button */}
                  <Button type="submit" variant="primary" className="btn-block mb-4">
                    Iniciar sesión
                  </Button>
                  <Row className="mb-4">
                  <Col className="d-flex justify-content-center">
                    {/* Checkbox */}
                    <Form.Check
                      type="checkbox"
                      id="form2Example31"
                      label="Recuérdame"
                      defaultChecked
                    />
                  </Col>
                </Row>
                </div>

                {/* Register buttons */}
                <div className="text-center">
                  <p>¿No tiene una cuenta? <Link to={routes.registro}>Regístrarse</Link></p>
                  <Col>
                    {/* Simple link */}
                    <Link to={routes.recuperacion}>¿Olvidó su contraseña?</Link>
                  </Col>
                </div>
              </Form>
          </Card>
        </Container>
      </div>
    </div>
  );
};