import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';


export default function PublicRoute() {
    const { isLogged } = useAuth();
    if (isLogged()) {
        return <Navigate to={routes.home} />
    }
    return <Outlet />
}
