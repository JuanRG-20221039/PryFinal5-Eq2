import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../public/pages/Home';
import Login from '../public/auth/Login';
import Recovery from '../public/auth/Recovery';
import Registro from '../public/auth/Registro';
import Cuenta from '../public/user/Cuenta';
import Users from '../public/admin/Users';
import NotFoundPage from '../public/pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import roles from '../helpers/roles';
import routes from '../helpers/routes';
import Device from '../public/admin/Device';
import Dashboard from '../public/user/iot/Dashboard';
import Devices from '../public/user/iot/Devices';
import IoTLayout from '../layouts/IoTLayout';
import DeviceU from '../public/user/iot/DeviceU';
import Contacto from '../public/pages/Contacto';
import QuienesSomos from '../public/pages/QuienesSomos';
import FAQ from '../public/pages/FAQ';
import Mision from '../public/pages/Mision';
import Vision from '../public/pages/Vision';
import Politicas from '../public/pages/Politicas';
import VentanaIOT from '../public/pages/SmartGlass'
import ProductosRojos from '../public/pages/ProductosRojos';
import ProductosTropicales from '../public/pages/ProductosTropicales';
import ProductosSemillas from '../public/pages/ProductosSemillas';
import Producto from '../public/pages/Producto';
import Informacion from '../public/admin/Informacion';
import AddProductos from '../public/admin/AddProductos';

export default function AppRouter() {

    return (
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.productosRojos} element={<ProductosRojos />} />
            <Route path={routes.productosTropicales} element={<ProductosTropicales />} />
            <Route path={routes.productosSemillas} element={<ProductosSemillas />} />
            <Route path={routes.SmartGlass} element={<VentanaIOT />} />
            <Route path={routes.detalleProducto} element={<Producto />} />

            <Route path={routes.faq} element={<FAQ />} />
            <Route path={routes.contacto} element={<Contacto />} />
            <Route path={routes.quienesSomos} element={<QuienesSomos />} />

            <Route path={routes.mision} element={<Mision />} />
            <Route path={routes.vision} element={<Vision />} />
            <Route path={routes.politicas} element={<Politicas />} />
            
            <Route element={<PublicRoute />}>
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.recuperacion} element={<Recovery />} />
                <Route path={routes.registro} element={<Registro />} />
            </Route>
            <Route element={<PrivateRoute/>}>
                <Route path={routes.perfil} element={<Cuenta />} />
            </Route>
            <Route element={<PrivateRoute hasRole={roles.regular}/>}>
                
                <Route path={routes.iotU} element={<IoTLayout />} >
                    <Route path={routes.iotDashboardU} element={<Dashboard />} />
                    <Route path={routes.iotDevicesU} element={<Devices />} />
                    <Route path={routes.iotDeviceU} element={<DeviceU />} />
                </Route>
            </Route>
            <Route element={<PrivateRoute hasRole={roles.admin} />}>
                <Route path={routes.usuariosA} element={<Users />} />
                <Route path={routes.iotA} element={<Device />} />
                <Route path={routes.informacion} element={<Informacion />} />
                <Route path={routes.addProductos} element={<AddProductos />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
