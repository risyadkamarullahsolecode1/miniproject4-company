import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Company Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/employees">
                                <Nav.Link>Employees</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/departments">
                                <Nav.Link>Departments</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/projects">
                                <Nav.Link>Projects</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/worksons">
                                <Nav.Link>Works On</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                {children}
            </Container>
            <Footer />
        </>
    );
};

export default Layout;