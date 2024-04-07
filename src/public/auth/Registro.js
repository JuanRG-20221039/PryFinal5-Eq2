import React, { useState } from 'react';
import { Form, Button, Card, FloatingLabel, Alert, Container, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';
import useFetch from '../../helpers/useFetch';
import { useForm } from 'react-hook-form';
import useAuth from '../../auth/useAuth';

const Registro = () => {
  const [datos, setDatos] = useState('Personales', { required: true });
  const { data, loading } = useFetch('https://apipry.onrender.com/questions', { required: true });

  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  const { signup, user } = useAuth();
  const changeDatos = (newDatos) => {
    setDatos(newDatos);
  };

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    signup(values);
  });

  const handleSiguienteClick = async () => {
    // Triggers para realizar validaciones
    const isValid = await trigger();

    if (isValid) {
      // Lógica adicional si es necesario
      changeDatos('Cuenta', { required: true });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Image src='/images/fondo.png' style={{ width: 1310, height: 700 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container style={{ width: '30rem' }} className='mb-4'>

          <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h1 className="my-4">𝙍𝙚𝙜𝙞𝙨𝙩𝙧𝙤</h1>
            <Nav fill variant="tabs" defaultActiveKey={'Personales'}>
              <Nav.Item>
                <Nav.Link eventKey={'Personales'} onClick={() => changeDatos('Personales', { required: true })}>
                  Datos Personales
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={'Cuenta'} onClick={() => changeDatos('Cuenta', { required: true })}>
                  Datos de la Cuenta
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Container className="card-body">
              <Form autoComplete='off' onSubmit={onSubmit}>
                {datos === 'Personales' && (
                  <>
                    <Container className="mb-3">
                      <FloatingLabel controlId="name" label="Nombre">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su nombre"
                          {...register('nombre.nombre', {
                            required: true,
                            pattern: /^[a-zA-Z]+$/, // Solo letras permitidas
                          })}
                        />
                      </FloatingLabel>
                      {errors?.nombre?.nombre?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                      {errors?.nombre?.nombre?.type === 'pattern' && (
                        <Alert variant='danger'>Ingrese solo letras en el nombre</Alert>
                      )}
                    </Container>
                    <Container className="mb-3">
                      <FloatingLabel controlId="apP" label="Apellido paterno">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su apellido paterno"
                          {...register('nombre.apP', {
                            required: true,
                            pattern: /^[a-zA-Z]+$/, // Solo letras permitidas
                          })}
                        />
                      </FloatingLabel>
                      {errors?.nombre?.apP?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                      {errors?.nombre?.apP?.type === 'pattern' && (
                        <Alert variant='danger'>Ingrese solo letras en el apellido paterno</Alert>
                      )}
                    </Container>
                    <Container className="mb-3">
                      <FloatingLabel controlId="apM" label="Apellido Materno">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su apellido Materno"
                          {...register('nombre.apM', {
                            required: true,
                            pattern: /^[a-zA-Z]+$/, // Solo letras permitidas
                          })}
                        />
                      </FloatingLabel>
                      {errors?.nombre?.apM?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                      {errors?.nombre?.apM?.type === 'pattern' && (
                        <Alert variant='danger'>Ingrese solo letras en el apellido materno</Alert>
                      )}
                    </Container>
                    <Container className="mb-3">
                      <FloatingLabel controlId="tel" label="Numero de Teléfono">
                        <Form.Control
                          type="tel"
                          placeholder="Ingrese su teléfono"
                          {...register('telefono', {
                            required: true,
                            pattern: /^[0-9]+$/, // Solo números permitidos
                          })}
                        />
                      </FloatingLabel>
                      {errors.telefono && (
                        <Alert variant='danger'>
                          {errors.telefono.type === 'required'
                            ? 'El campo es requerido'
                            : 'Ingrese solo números en el teléfono'}
                        </Alert>
                      )}
                    </Container>
                    <Button style={{marginBottom:10}} variant='outline-primary' className=" me-2" onClick={handleSiguienteClick}>
                      Siguiente
                    </Button>
                  </>
                )}

                {datos === 'Cuenta' && (
                  <>
                    <Container className="mb-3">
                      <FloatingLabel controlId="email" label="Correo Electronico">
                        <Form.Control
                          type="email"
                          placeholder="Ingrese su e-mail"
                          {...register('datosCuenta.email', {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación básica de correo electrónico
                          })}
                        />
                      </FloatingLabel>
                      {errors?.datosCuenta?.email?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                      {errors?.datosCuenta?.email?.type === 'pattern' && (
                        <Alert variant='danger'>Ingrese un correo electrónico válido</Alert>
                      )}
                    </Container>
                    <Container className='mb-3'>
                      <FloatingLabel controlId="password" label="Contraseña">
                        <Form.Control
                          type="password"
                          placeholder="Ingrese su password"
                          {...register('datosCuenta.password', {
                            required: true,
                            minLength: 8, // Mínimo 8 caracteres
                          })}
                        />
                      </FloatingLabel>
                      {errors?.datosCuenta?.password?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                      {errors?.datosCuenta?.password?.type === 'minLength' && (
                        <Alert variant='danger'>La contraseña debe tener al menos 8 caracteres</Alert>
                      )}
                    </Container>
                    <Container className='mb-3'>
                      <FloatingLabel controlId="repPass" label="Repetir contraseña">
                        <Form.Control
                          type="password"
                          placeholder="Repita su password"
                          {...register('repPass', {
                            required: true,
                          })}
                        />
                      </FloatingLabel>
                      {errors?.repPass?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                    </Container>
                    <Container className='mb-3'>
                      <Form.Label>Pregunta Secreta</Form.Label>
                      <Form.Select
                        {...register('datosCuenta.preguntaRecuperacion.idPregunta', { required: true })}
                      >
                        <option value={''}>Elija su pregunta secreta...</option>
                        {loading ? (<></>) : (
                          data.map(pregunta => (
                            <option key={pregunta._id} value={pregunta._id}>{pregunta.pregunta}</option>
                          ))
                        )}
                      </Form.Select>
                      {errors?.datosCuenta?.preguntaRecuperacion?.idPregunta?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                    </Container>
                    <Container className="mb-3">
                      <FloatingLabel controlId="respuesta" label="Respuesta">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su respuesta"
                          {...register('datosCuenta.preguntaRecuperacion.respuesta', { required: true })}
                        />
                      </FloatingLabel>
                      {errors?.datosCuenta?.preguntaRecuperacion?.respuesta?.type === 'required' && (
                        <Alert variant='danger'>El campo es requerido</Alert>
                      )}
                    </Container>
                    <Button style={{marginBottom:10}} variant='outline-primary' className=" me-2" onClick={() => changeDatos('Personales', { required: true })}>
                      Regresar
                    </Button>
                  </>
                )}

                <Button type='submit' variant='primary'>Registrarse</Button>
              </Form>
            </Container>

          </Card>
          
        </Container>
      </div>
    </div>
  );
};

export default Registro;