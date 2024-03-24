import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';


export default function PrivateRoute({ hasRole: role,children }) {
    const location=useLocation();
    const { isLogged,hasRole } = useAuth();
    if (!isLogged()) {
        return <Navigate to={{pathname:routes.login}} state={{from:location.pathname}} />
    }
    if (role&&!hasRole(role)) return <Navigate to={routes.home}/>

    return children?children:<Outlet />
}
