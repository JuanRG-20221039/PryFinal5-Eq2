import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';
export default function Navigation() {
    const { isLogged, logout,hasRole } = useAuth();
    return (
        <Navbar collapseOnSelect expand="lg" variant='light' style={{ backgroundColor: '#fb8500' }}>
            <img src="/logo.png" alt="logo" style={{width:'5%', marginLeft:20}}/>
            <Navbar.Brand as={NavLink} to={routes.home}>
            𝘾𝙧𝙪𝙣𝙘𝙝𝙮𝙁𝙧𝙪𝙞𝙩𝙨
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="mx-auto " variant='underline'>
                    <Nav.Link as={NavLink} to={routes.productosRojos}>FrutosRojos</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.productosTropicales}>Tropicales</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.productosSemillas}>Semillas</Nav.Link>
                    {
                        hasRole('admin')?(
                            <NavDropdown title='ADMIN'>
                                <NavDropdown.Item as={NavLink} to={routes.usuariosA}>Usuarios</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={routes.addProductos}>Productos</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={routes.informacion}>Informacion</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={routes.iotA}>Iot</NavDropdown.Item>

                            </NavDropdown>
                        ):hasRole('usuario')?(
                            <NavDropdown title='SmartGlass System'>
                                <NavDropdown.Item as={NavLink} to={routes.iotU+routes.iotDevicesU}>Panel de Control</NavDropdown.Item>
                            </NavDropdown>
                        ):(<></>)
                    }
                    
                </Nav>
                <Nav className='me-4' variant='underline'>
                    {isLogged() ? (<>
                        <Nav.Link as={NavLink} to={routes.perfil}>
                            MI PERFIL
                        </Nav.Link>
                        <Nav.Link onClick={() => logout()}>
                            CERRAR SESIÓN
                        </Nav.Link>
                    </>
                    ) : (
                        <>
                        <div style={{marginTop:7}}>
                            ||
                        </div>
                            <Nav.Link as={NavLink} to={routes.login}>
                                𝙄𝙉𝙄𝘾𝙄𝘼𝙍 𝙎𝙀𝙎𝙄𝙊𝙉
                            </Nav.Link>
                            <Nav.Link as={NavLink} to={routes.registro}>
                                𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝘼𝙍𝙎𝙀
                            </Nav.Link>
                        </>
                    )}
                </Nav>


            </Navbar.Collapse>
        </Navbar>
    )
}
