import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const NavbarComponent= ()=>{
    return(
        <>
            <Navbar style={{backgroundColor:"#6A5ACD", marginBottom : "1rem"}}>
                <Container style={{height:"8vh"}}>
                    <Navbar.Brand style={{textTransform:"uppercase", fontWeight:"bold"}}>Expression Engine</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
};

export default NavbarComponent;