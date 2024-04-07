import axios from "axios";
const API='https://apipry.onrender.com'
export const registerRequest=(user)=>axios.post(`${API}/usuarios`,user)
export const loginRequest=(user)=>axios.post(`${API}/auth/login`,user)
export const logoutRequest=()=>axios.post(`${API}/auth/logout`)