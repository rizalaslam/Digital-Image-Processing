import React, {Component} from 'react';
import { Container, Row, Col,  Card,CardTitle, CardBody, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class About extends Component {
      
    render() {
        return (
    <Container className="mt-5 text-center">
      <p>Made with <FontAwesomeIcon icon="heart" style={{ color: 'blue' }} /> + <FontAwesomeIcon icon="coffee" style={{ color: 'brown' }} /> + <FontAwesomeIcon icon={['fab', 'react']} style={{ color: 'blue' }}/></p>
    </Container>
);
}
}
export default About;