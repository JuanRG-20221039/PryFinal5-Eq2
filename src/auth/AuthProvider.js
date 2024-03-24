import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
    const login = (userCredentials,fromLocation)=>{
        console.log(userCredentials)
        setUser(userCredentials);
        if(fromLocation)
            return navigate(fromLocation);
        navigate('/')
    }
    const signup=async(user)=>{
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data);
    }
    const logout=async ()=>{
        const response = await logoutRequest();
        console.log(response.data)
        if (response.data!=='OK') {
            // Manejar errores según sea necesario
            throw new Error('Error en la solicitud');
        }
        setUser(null);
    };
    const isLogged=()=>!!user;
    const hasRole=(role)=>user?.role===role;
    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout,
        signup
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}