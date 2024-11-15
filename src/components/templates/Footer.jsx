import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing Instagram icon from react-icons
import { faSquareInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons/faSquareFacebook';

const Footer = () => {
    return (
        <footer className="bg-dark fixed-bottom pt-2 align-content-center">
            <Container className="">
                <Row>
                    <Col className="text-center text-light">
                        <h5>Contact Us</h5>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" >
                            <FontAwesomeIcon icon={faSquareInstagram} size={30} style={{ margin: '0 10px' }}/>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareFacebook} size={30} style={{ margin: '0 10px' }} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareTwitter} size={30} style={{ margin: '0 10px' }} />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center text-light">
                        <p style={{ marginTop: '10px' }}>© {new Date().getFullYear()} Company . All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;