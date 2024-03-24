import axios from "axios";
const API = 'https://apipry-dev-gjxn.1.us-1.fl0.io'

export const dispositivosRequest = () => axios.get(`${API}/devices`)
export const dispositivoRequest = (dispositivoID) => axios.get(`${API}/devices/${dispositivoID}`)
export const agregarDispositivoRequest = () => axios.post(`${API}/devices`)
export const asignarDispositivoRequest = (dispositivoID, userID) => axios.post(`${API}/devices/user/${userID}`, { dispositivoID: dispositivoID })
export const eliminarDispositivoRequest = (dispositivoID) => axios.delete(`${API}/devices/${dispositivoID}`)
export const usuariosRequest = () => axios.get(`${API}/devices/usuarios`)

export const dispositivosUserRequest = (userID) => axios.post(`${API}/devices/user`,{id:userID})
export const etiquetaRequest=(dispostivoID,label)=>axios.post(`${API}/devices/${dispostivoID}/label`,{name:label})

// Nueva función para actualizar un campo específico de un dispositivo
export const actualizarCampoDispositivoRequest = (dispositivoID, campo, valor) => axios.put(`${API}/devices/${dispositivoID}/${campo}/${valor}`);