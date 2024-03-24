import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import routes from '../helpers/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGear} from '@fortawesome/free-solid-svg-icons'
export default function IotNavigation() {
    return (
        <Navbar collapseOnSelect expand="lg" variant='dark' style={{ backgroundColor: '#ffd645' }}>
            <Navbar.Brand as={NavLink} to={routes.home} className='ms-5'>
            <FontAwesomeIcon icon={faGear} style={{color: "#000",height:30}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="mx-auto " variant='underline'>
                    <Nav.Link style={{color: "#000"}} as={NavLink} to={routes.iotU+routes.iotDashboardU}>Dashboard</Nav.Link>
                    <Nav.Link style={{color: "#000"}} as={NavLink} to={routes.iotU+routes.iotDevicesU}>Dispositivos</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
