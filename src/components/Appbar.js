import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/appbar.css'
import {Image, NavLink, Row} from "react-bootstrap";

import logo from './photo/logo.png'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

export default function Appbar() {
    return (
        <>
            <Navbar id='header'>
                {/*<Row>*/}
                    <Typography id="headtext" variant='h6' align='left' color='White' paragraph>
                        217A Chandler St Worcester MA 01609
                    </Typography>
                    <Typography id="headtext" variant='h6' align='left' color='White' paragraph>
                        (508)756-6888
                    </Typography>

                <Typography id="headtext" variant='h6' align='left' color='White' paragraph>
                    Sun: 12:00PM-10:30PM    Tues-Thurs: 11:00AM-10:30PM     Fri-Sat: 11:00AM-11:00PM
                </Typography>
                {/*</Row>*/}
            </Navbar>


            <Navbar id='navbar1' >
                {/*<Container id='navcontainer' fluid>*/}
                    <Nav id='nav1' className={"align-items-end"}>

                        <Navbar.Brand id='logo' as={NavLink} to={'/'}>
                            <Image src={logo} width='150vm'/>
                        </Navbar.Brand>

                        <Nav.Item className={"navitem"}>
                            <Link to={'/'}>
                                <p className={"navtext"}>ABOUT US</p>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className={"navitem"}>
                            <Link to="/menupage">
                                <p className={"navtext"}>MENU</p>
                            </Link>
                        </Nav.Item>



                        <Nav.Item className={"navitem"}>
                            <Link to="/home">
                                <p className={"navtext"}>GALLERY</p>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className={"navitem"}>
                            <Link to="/home">
                                <p className={"navtext"}>CONTACT US</p>
                            </Link>
                        </Nav.Item>
                    </Nav>
            </Navbar>
        </>
    );
}



