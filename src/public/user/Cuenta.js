import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../auth/useAuth'; // Asegúrate de que la ruta sea correcta
import { Card, Row } from 'react-bootstrap';
import './User.css'

export default function Cuenta() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Verificamos si el usuario está autenticado
    if (user) {
      // Realizar la solicitud para obtener los datos del usuario basados en su ID
      axios.get(`https://apipry.onrender.com/usuarios/${user.id}`)
        .then(response => {
          // Almacenar los datos del usuario en el estado
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
          // Manejar errores según sea necesario
        });
    }
  }, [user]);
  
  console.log(userData); // Añade esta línea para ver los datos que estás recibiendo
  
  return (
    <div>
      <div className="background-image">
        <img src='/images/fondo.png' alt="background" style={{ width: '100%', height: '100%' }} />
      </div>
      <Card>
        <h1>𝘾𝙪𝙚𝙣𝙩𝙖</h1>
      </Card>
      {userData && ( // Verificamos si los datos del usuario están disponibles
        <div>
          <Row>
            <Card style={{width:'70%'}}>
            <h2>𝘿𝙖𝙩𝙤𝙨 𝙙𝙚𝙡 𝙐𝙨𝙪𝙖𝙧𝙞𝙤:</h2> 
              <p><strong>Nombre:</strong> {userData.nombre.nombre} {userData.nombre.apP} {userData.nombre.apM}</p>
              <p><strong>Email:</strong> {userData.datosCuenta.email}</p>
              <p><strong>Teléfono:</strong> {userData.telefono}</p>
              {/* <p><strong>Rol de Usuario:</strong> {userData.datosCuenta.rol}</p> */}
            </Card>
            <Card style={{width:'17%', marginLeft:-60}}>
              <img src='/images/usuario.png' alt="chat" style={{width:200}}/>
            </Card>
          </Row>
        </div>
      )}
    </div>
  );
  
}
